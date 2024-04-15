# usff-footer

## Summary

This Application Customer:

Creates a "footerLinks" list on your hub site with mandatory minimum links.
Creates an expandable footer rendering links from the above hub list.
This solution utilizes Fluint UI Core & React.
Footer colors are dynamic (follow the theme).
Auto-deployment is ON.
A link to the footerLinks list will always appear in the dev tools console for quick access.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

A list with display name of "footerLinks" will be created for you the associated Hub site the first time any user navigates to a site once this is deployed. 
It is important you (admin) navigate to any connected hub site to ensure the list was installed correctly (must have permissions).

The solution will also add the bare minimum links ("Sticky Links") required on the footer.

The list will contain the following columns (case-sensitive):
Title (default)
header (choice)
link (single line of text)
image* (image thumbnail)
address** (multiple lines of text - rich text)
active (Yes/No)

There are 4 header choices that drive parts of the footer:
_MandatoryLink - image links at the bottom of the flyout
_StickyLink - links in center of sticky footer
_SupportLink - link on right of stickey footer
_CommandAddress - address (or other info) under Command Information in the flyout

*image column is only used in conjuction with _StickyLink's
**address column is only used for the Command Information (WYSIWYG)

## Solution

Solution|Author(s)|E-mail
--------|---------|--------
Custom Footer Application Customizer | Mike Landino, USFF N611 | michael.d.landino.ctr@us.navy.mil

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 20, 2022|Initial release,
1.0.4.2|Sep 1, 2022|Removed green banners.  Add automatic install of footerLinks list, minimum Sticky Links.
1.0.4.3|Jan 17, 2023|Forced all links to open in new tab due to caching issues using back button.
1.0.4.4|Jan 19, 2023|Changed hover color on links in popup to vary from original color.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
  - git clone https://sync.git.mil/USFF/N6/N61/SPO/spfx-header-footer.git
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:


Full screen with footer expanded (flyout showing)
![ScreenShot2](/src/extensions/usffCustomHeaderFooter/screenshots/footerExpanded.png)

Example of footerLinks list on Hub site (required)
![ScreenShot3](/src/extensions/usffCustomHeaderFooter/screenshots/footerList.png)



> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development