import { createContext, use, useCallback, useEffectEvent, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Nullable } from "@/shared/base.types";
import { NavItem } from "./NavItem";
import { NavRail } from "./NavRail";
import { NavRailToggle } from "./NavRailToggle";
import type { M3eNavItemElement } from "@m3e/react/nav-bar";


export type NavContextType = {
    isOpen?: boolean;
    id?: string;
    item?: Nullable<M3eNavItemElement>;
}

type NavContextInternalType = NavContextType & {
    onNavItemHandler: (item: M3eNavItemElement) => void;
    onChangeHandler: (e: Event, onChange?: (e: Event) => void) => void;
    onSelected: (element: M3eNavItemElement) => void;
    useNavItemRef: () => React.RefObject<M3eNavItemElement | null>;
}

const NavContext = createContext<Nullable<NavContextInternalType>>(null);

type Props = PropsWithChildren & {
    id?: string;
    isOpen?: boolean;
}

export const Nav = ({children, id, isOpen}: Props) => {
    const [item, setNavItem] = useState<Nullable<M3eNavItemElement>>(null)
    const m3eNavItemRef = useRef<M3eNavItemElement>(null);
    const onNavItemHandler = useCallback((item: M3eNavItemElement) => setNavItem(item), []);

    const onChangeHandler = useEffectEvent((e: Event, onChange?: (e: Event) => void) => {
        const element = m3eNavItemRef.current;
        if (element?.selected) onNavItemHandler(element);
        onChange?.(e);
    });

    const onSelected = useEffectEvent((element: M3eNavItemElement) => {
        onNavItemHandler(element);
    });

    const useNavItemRef = () => m3eNavItemRef;

    return (
        <NavContext.Provider value={{isOpen, id, item, onNavItemHandler, onChangeHandler, onSelected, useNavItemRef}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNav = (): NavContextType => {
    const context = use(NavContext);
    if (!context) {
        throw new Error("useNav must be used within a Nav component");
    }
    const { onNavItemHandler, onChangeHandler, onSelected, useNavItemRef, ...publicContext } = context;
    return publicContext;
}

export const useNavItemHandlers = () => {
    const context = use(NavContext);
    if (!context) {
        throw new Error("useNavItemHandlers must be used within a Nav component");
    }
    return {
        onChangeHandler: context.onChangeHandler,
        onSelected: context.onSelected,
        useNavItemRef: context.useNavItemRef,
    };
}

Nav.Rail = NavRail;
Nav.Item = NavItem;
Nav.Toggle = NavRailToggle;