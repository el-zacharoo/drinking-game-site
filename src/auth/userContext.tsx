import React, {
    useReducer,
    createContext,
    useContext,
    useCallback,
    JSX,
} from "react";

import cloneDeep from "lodash/clonedeep";

type Generic = {
    [key: string]: string;
};

type State = {
    user: Generic | null;
    loading: boolean;
    error: {
        message: string;
        stack: string;
    } | null;
};

type Action = {
    user: Generic | null;
    type: string;
    payload: any;
};

const init: State = {
    user: null,
    loading: false,
    error: null,
};

const api = import.meta.env.VITE_AUTH_API || "";
const authContext = createContext<any>(init);

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "init":
            return {
                ...state,
                user: cloneDeep(state.user),
                loading: true,
                error: null,
            };
        case "loaded":
            return {
                ...state,
                user: cloneDeep(action.payload),
                loading: false,
                error: null,
            };
        case "signin":
            return {
                ...state,
                loading: false,
                error: null,
            };

        case "error":
            return {
                ...state,
                user: cloneDeep(state.user),
                loading: false,
                error: action.payload,
            };

        case "clear":
            return { ...init };
        default:
            throw new Error(
                `unsuported action type dispatched to AuthProvider reducer: ${action.type}`
            );
    }
};

export const useUser = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useEntity must be used within an AuthProvider");
    }

    const { state, dispatch } = context;

    const clearState = useCallback(() => {
        dispatch({ type: "clear" });
    }, [dispatch]);

    // returns a user object
    const getUser = useCallback(async () => {
        const basicToken = localStorage.getItem("basic-tkn");
        dispatch({ type: "init" });

        if (basicToken === null) {
            dispatch({ type: "error", error: "No token found" });
            return;
        }
        try {
            const username = "CAHUTTE_MEMBER";
            const resp = await fetch(`${api}/GetAccount`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(`${username}:${basicToken}`)}`,
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({}),
            });

            const data = await resp.json();
            dispatch({ type: "loaded", payload: data.userInfo });
        } catch (error) {
            console.error("Failed to get user", error);
            dispatch({ type: "error", error: "Failed to get user" + error });
        }
    }, [dispatch]);

    const signIn = useCallback(
        async (credentials: Generic) => {
            dispatch({ type: "init" });

            try {
                const resp = await fetch(`${api}/SignIn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },

                    body: JSON.stringify({
                        authUserSignIn: credentials,
                    }),
                });

                const data = await resp.json();
                if (resp.ok) {
                    dispatch({ type: "signin", payload: data });
                    localStorage.setItem("basic-tkn", data.basicToken);
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Failed to sign in", error);
                dispatch({ type: "error", payload: error });
            }
        },
        [dispatch]
    );

    const signOut = useCallback(async () => {
        dispatch({ type: "init" });

        try {
            const resp = await fetch(`${api}/SignOut`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },

                body: JSON.stringify({}),
            });

            if (resp.ok) {
                localStorage.clear();
                clearState();
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Failed to sign in", error);
            dispatch({ type: "error", payload: error });
        }
    }, [dispatch, clearState]);

    return { state, getUser, clearState, signIn, signOut };
};

type Props = {
    children: React.ReactNode;
};

const AuthProvider = (props: Props): JSX.Element => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    );
};
export default AuthProvider;
