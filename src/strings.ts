import { ContextInfo } from "gd-sprest-bs";

// Sets the context information
// This is for SPFx or Teams solutions
export const setContext = (context) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Update the source url
    Strings.SourceUrl = ContextInfo.webServerRelativeUrl;
};

/**
 * Global Constants
 */
const Strings = {
    ProjectName: "Custom Footer Extension",
    FooterLinksList: "footerLinks",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    StickyLinks: {
        Section508Title: "Accessibility/Section 508",
        Section508Link: "http://dodcio.defense.gov/dodsection508/std_stmt.aspx",
        FOIATitle: "FOIA",
        FOIALink: "https://foia.navy.mil",
        USAGovTitle: "USA.gov",
        USAGovLink: "http://www.usa.gov",
        SupportTitle: "Support Desk",
        SupportLink: "https://flankspeed.sharepoint-mil.us/sites/SPOInformationPage"
    },
    Version: "0.1"
};
export default Strings;