import { IFooterLinksItem, IHubSiteData } from "./hubData/ds";

export interface IPortalFooterProps {
    links: IFooterLinksItem[];
    hubData: IHubSiteData[];
}

export interface IPortalFooterState {
    // used to hold the expanded/collapsed state for menu
    expanded: boolean;
    // used to hold the link groups
    links: IFooterLinksItem[];
    // holds the hub data
    hubData: IHubSiteData[];
    // used to determine if we are loading the links
    loadingLinks: boolean;
    // used to manage the expand/collapse button icon
    toggleButtonIconName: string;
}