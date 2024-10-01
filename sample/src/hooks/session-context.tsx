import {
  createContext,
  createRef,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import { LoginHandler } from '../components/Login';
import { useFetch } from './fetch-hooks';
import useToggle from './toggle';

// const SampleSession = {
//   loginUser: { id: 1, name: '홍길동' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };
const SampleSession = {
  loginUser: null,
  cart: [],
};

type LoginUser = { id: number; name: string };
export type CartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: CartItem[] };

type Action =
  | { type: 'initialize'; payload: Session }
  | { type: 'login'; payload: LoginUser }
  | { type: 'logout'; payload: null }
  | { type: 'addCartItem'; payload: CartItem }
  | { type: 'editCartItem'; payload: CartItem }
  | { type: 'removeCartItem'; payload: number };

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case 'initialize':
      return payload;
    case 'login':
      return { ...session, loginUser: payload };
    case 'logout':
      return { ...session, loginUser: null };
    case 'addCartItem': {
      return { ...session, cart: [...session.cart, payload] };
    }
    case 'editCartItem':
      return {
        ...session,
        cart: session.cart.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case 'removeCartItem':
      return {
        ...session,
        cart: session.cart.filter(({ id }) => id !== payload),
      };
    default:
      return session;
  }
};

const contextInitValue = {
  session: SampleSession,
  logout: () => {},
  login: (id: number, name: string) => {
    console.log(id, name);
  },
  removeCartItem: (id: number) => console.log(id),
  addCartItem: (name: string, price: number) => console.log(name, price),
  editCartItem: (item: CartItem) => console.log(item),
  loginRef: createRef<LoginHandler>(),
  toggleReloadSession: () => {},
};

type SessionContextProps = Omit<typeof contextInitValue, 'session'> & {
  session: Session;
};

const SessionContext = createContext<SessionContextProps>(contextInitValue);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatchSession] = useReducer(reducer, SampleSession);
  const [reloadSession, toggleReloadSession] = useToggle();

  const { data } = useFetch<Session>('/data/sample.json', true, [
    reloadSession,
  ]);

  useLayoutEffect(() => {
    dispatchSession({ type: 'initialize', payload: data || SampleSession });
  }, [data]);

  const loginRef = useRef<LoginHandler>(null);

  const logout = () => dispatchSession({ type: 'logout', payload: null });

  const login = (id: number, name: string) => {
    if (!id) {
      alert('사용자 ID를 입력하세요!');
      console.log('>>>', loginRef.current);
      return loginRef.current?.focus('id');
    }

    if (!name) {
      alert('Name을 입력하세요!');
      return loginRef.current?.focus('name');
    }

    dispatchSession({ type: 'login', payload: { id, name } });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    dispatchSession({
      type: 'addCartItem',
      payload: { id, name, price },
    });
  };

  const removeCartItem = (toRemoveId: number) => {
    dispatchSession({ type: 'removeCartItem', payload: toRemoveId });
  };

  const editCartItem = (item: CartItem) => {
    dispatchSession({ type: 'editCartItem', payload: item });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        logout,
        login,
        removeCartItem,
        addCartItem,
        editCartItem,
        loginRef,
        toggleReloadSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
