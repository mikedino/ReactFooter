import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "../../../strings";

/**
 * SharePoint Assets for the current site connected Hub
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.FooterLinksList,
                Description: "List containing all links for this hub footer. **Do not delete**",
                OnQuickLaunch: false,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            CustomFields: [
                {
                    name: "header",
                    title: "Header",
                    type: Helper.SPCfgFieldType.Choice,
                    defaultValue: "",
                    choices: [
                        "USFF Community Links",
                        "Services",
                        "USFF Apps",
                        "Guidance",
                        "Calendars",
                        "Org Charts",
                        "_MandatoryLink",
                        "_StickyLink",
                        "_SupportLink",
                        "_CommandAddress"
                    ]
                } as Helper.IFieldInfoChoice,
                {
                    name: "link",
                    title: "Link",
                    description: "URL to the resource",
                    type: Helper.SPCfgFieldType.Text
                },
                {
                    name: "image",
                    title: "Image",
                    type: Helper.SPCfgFieldType.Image,
                    description: "image for URL (used for Mandatory Links)"
                },
                {
                    name: "active",
                    title: "Active",
                    type: Helper.SPCfgFieldType.Boolean,
                    defaultValue: "1",
                    description: "uncheck to hide from footer"
                } as Helper.IFieldInfoChoice,
                {
                    name: "address",
                    title: "Command Address",
                    type: Helper.SPCfgFieldType.Note,
                    description: "Only used for the Command Address display on the flyout",
                    noteType: SPTypes.FieldNoteType.RichText
                } as Helper.IFieldInfoNote
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    Default: true,
                    ViewQuery: "<OrderBy><FieldRef Name=\"header\" /></OrderBy>",
                    ViewFields: [
                        "header", "LinkTitle", "link", "active", "image", "address"
                    ]
                },
                {
                    ViewName: "Grouped",
                    ViewQuery: "<GroupBy Collapse=\"TRUE\" GroupLimit=\"30\"><FieldRef Name=\"header\" /></GroupBy>",
                    ViewFields: [
                        "LinkTitle", "link", "active", "image", "address"
                    ]
                }
            ]
        }
    ]
});