import { IFooterLinksResponseItem } from "./ds";
import Strings from "../../../strings";


export default class StickyLink {

    // minimum starting data to load the sticky footer extension
    public static minData: IFooterLinksResponseItem[] = [

        {

            header: "_StickyLink",
            Title: Strings.StickyLinks.Section508Title,
            link: Strings.StickyLinks.Section508Link
        },
        {

            header: "_StickyLink",
            Title: Strings.StickyLinks.FOIATitle,
            link: Strings.StickyLinks.FOIALink
        },
        {

            header: "_StickyLink",
            Title: Strings.StickyLinks.USAGovTitle,
            link: Strings.StickyLinks.USAGovLink
        },
        {
            header: "_SupportLink",
            Title: Strings.StickyLinks.SupportTitle,
            link: Strings.StickyLinks.SupportLink
        }

    ] as any;

}