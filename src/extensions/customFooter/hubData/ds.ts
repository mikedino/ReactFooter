import { Types, Web, ContextInfo } from 'gd-sprest-bs';
import Strings, { setContext } from '../../../strings';
import StickyLink from './data';

// Hub Data (Response)
export interface IHubSiteDataResponse {
    HubSiteData: string;
}

// Hub data (Parsed)
export interface IHubSiteDataJson {
    themeKey: string;
    name: string;
    url: string;
    logoUrl: string;
    usesMetadataNavigation: boolean;
    navigation: {
        Id: number;
        Title: string;
        Url: string;
        IsDocLib: boolean;
        IsExternal: boolean;
        ParentId: number;
        ListTemplateType: number;
        Children: any[]
    }[];
}

// basic data from the linked Hub needed for the footer display
export interface IHubSiteData {
    url: string;
    name: string;
    logo: string;
}

// Footer Items (JSON response)
export interface IFooterLinksResponseItem extends Types.SP.ListItem {
    // __metadata: {
    //     type: string;
    // };
    header: string;
    active: boolean;
    link?: string;
    image?: string;
    address?: string;
}

// Footer Items (after organizing into groups)
export interface IFooterLinksItem {
    header: string;
    links: {
        id: number;
        title: string;
        link?: string;
        image?: string;
        address?: string;
    }[];
}

export class DataSource {
    // Initializes the application
    public static init(context?): PromiseLike<any> {

        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context);
        }

        // Return a promise
        return new Promise((resolve, reject) => {

            //Get the hub data
            this.loadHub().then(() => {
                // Then load the links list data
                this.loadList().then(resolve, reject);
            }, reject);

        });
    }

    // Loads the connected Hub data
    private static _hubUrl: string = null;
    static get HubUrl(): string { return this._hubUrl; }
    private static _hubData: IHubSiteData[] = null;
    static get HubData(): IHubSiteData[] { return this._hubData; }
    private static loadHub(): PromiseLike<IHubSiteData[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get hub data
            Web(Strings.SourceUrl).hubSiteData().execute(
                response => {

                    // store raw response
                    let rawdata: IHubSiteDataResponse = response as any;

                    // if there is a hub then parse to create a usable object
                    if (rawdata.HubSiteData) {

                        // store HubSiteData property as a JSON object
                        let hubJson: IHubSiteDataJson = JSON.parse(rawdata.HubSiteData);

                        // store related hub metadata
                        this._hubData = {
                            url: hubJson.url,
                            name: hubJson.name,
                            logo: hubJson.logoUrl
                        } as any;

                        // set hub URL for use in other classes
                        this._hubUrl = hubJson.url;

                    } else { reject(); }//no hub connected

                    // resolve the request
                    resolve(this._hubData);
                },
                // Error, reject the request
                () => { reject(); }
            );
        });
    }

    // Loads the footerLinks list data
    private static _footerItems: IFooterLinksItem[] = [];
    static get FooterItems(): IFooterLinksItem[] { return this._footerItems; }
    private static loadList(): PromiseLike<IFooterLinksItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            Web(this._hubUrl).Lists(Strings.FooterLinksList).Items().query({
                GetAllItems: true,
                Filter: "active eq 1",
                OrderBy: ["header"],
                Select: ["ID", "header", "Title", "link", "address", "image"]
            }).execute(
                // Success
                items => {
                    // Parse the items
                    if (items.results.length > 0) {
                        for (let i = 0; i < items.results.length; i++) {
                            let item: IFooterLinksResponseItem = items.results[i] as any;
                            // set image URL if it exists.  image column is an object stored as a string.
                            item.image = item.image ? JSON.parse(item.image).serverRelativeUrl : "";

                            // for new group headers
                            if (this._footerItems.length === 0 || item.header !== this._footerItems[this._footerItems.length - 1].header) {
                                // create the new group and add the current item
                                this._footerItems.push({
                                    header: item.header,
                                    links: [{
                                        id: item.Id,
                                        title: item.Title,
                                        link: item.link,
                                        image: item.image,
                                        address: item.address
                                    }],
                                });
                            } else {
                                // or add the current item to the already existing group
                                this._footerItems[this._footerItems.length - 1].links.push({
                                    id: item.Id,
                                    title: item.Title,
                                    link: item.link,
                                    image: item.image,
                                    address: item.address
                                });
                            }

                            // Resolve the request
                            resolve(this._footerItems);
                        }
                    } else {
                        
                        console.warn(`[${Strings.ProjectName}] No items exist on the ${Strings.FooterLinksList} list`);

                        // no items exist - so create standard placeholders
                        this.createStickyLinks().then(resolve);
                        
                        //console.log(`[${Strings.ProjectName}] Created Sticky items on the ${Strings.FooterLinksList} list`);
                    }
                },
                // Error, reject the request
                // No list exists
                error => {
                    reject(this._footerItems);
                    console.error(`[${Strings.ProjectName}] Error fetching footer links`, error);
                });
        });
    }

    public static createStickyLinks(): Promise<any> {

        return new Promise((resolve, reject) => {

            // Get the context info (form digest) of the hub site (because of cross-site API calls)
            ContextInfo.getWeb(this._hubUrl).execute((contextInfo) => {

                // get the web & list with form digest
                let list = Web(this._hubUrl, { requestDigest: contextInfo.GetContextWebInformation.FormDigestValue, }).Lists(Strings.FooterLinksList);

                // add minimum (sticky items) to the list as placeholders
                for (let i = 0; i < StickyLink.minData.length; i++) {
                    let item = StickyLink.minData[i];
                    // create the item in the list
                    // flag true to wait for previous add
                    list.Items().add(item).execute((listItem) => {
                        //success
                        console.log(`[${Strings.ProjectName}] Created Sticky item "${listItem.Title}" on the ${Strings.FooterLinksList} list`);
                    }, (error) => {
                        //error
                        reject();
                        console.error(`[${Strings.ProjectName}] Error creating placeholder sticky footer item`, error);
                    }, true);
                }

                // resolve the promise
                list.done(resolve);

            });

        });

    }

}