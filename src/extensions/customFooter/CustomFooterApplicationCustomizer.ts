import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { override } from '@microsoft/decorators';

import { InstallationRequired } from "dattatable";
import { Configuration } from './hubData/cfg';
import { IPortalFooterProps } from './interfaces';
import { PortalFooter } from './footer';
import { DataSource } from './hubData/ds';

import '../customFooter/footer/footer.module.scss';
import Strings from '../../strings';

const LOG_SOURCE: string = 'CustomFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomFooterApplicationCustomizerProperties {
  linksListTitle: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomFooterApplicationCustomizerProperties> {

  // Global Variables
  private _footer: PlaceholderContent = null;

  @override
  public async onInit(): Promise<void> {
    Log.info(Strings.ProjectName, `Initialized ${Strings.ProjectName} `);

    DataSource.init(this.context).then(
      // Data successfully loaded
      
      () => {
        Log.info(Strings.ProjectName, "data successfully loaded");
        this._renderPlaceHolders();
      },
      // Error (data not loaded)
      (err) => {
        Log.warn(Strings.ProjectName, "Error loading Datasource" + err);
        
        if (DataSource.HubData) {

          Log.verbose(Strings.ProjectName, "HubData present");

          // set configuration site to connected hub
          Configuration.setWebUrl(DataSource.HubUrl);

          // See if an installation of Footer Links list is required
          InstallationRequired.requiresInstall(Configuration).then(installFl => {
            // See if an install is required
            if (installFl) {
              Log.warn(Strings.ProjectName, "Install required");
              
              // Show the dialog
              InstallationRequired.showDialog({ 
                onBodyRendered: el => {
                  el.innerHTML = `<br/><p>The ${Strings.ProjectName} requires the '${Strings.FooterLinksList}' list to be created on the hub site.</p>` +
                    `<p>Do you wish to install it now? (NOTE: elevated permissions are required)</p>`;
                } 
              });

              //// TODO: once an onComplete event is added to the library, we need to create the list items here, then refresh the datasource
            
            } else {
              // doesn't require install              
              Log.warn(Strings.ProjectName, "Install not required");
              return;
            }

          }, (error) => {
            Log.error(Strings.ProjectName, error);
          });

        } else {
          console.warn(Strings.ProjectName, "Error loading Hub Data -- no Hub Data exists (not connected to a hub).");
          return;
        }

      }

    );

  }

  private _renderPlaceHolders(): Promise<void> {

    // check if footer app customizer has already been rendered
    //if (this._footer === null) {
    if (!this._footer) {

      // Create the footer
      this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });

      const element: React.ReactElement<IPortalFooterProps> = React.createElement(
        PortalFooter,
        {
          links: DataSource.FooterItems,
          hubData: DataSource.HubData
        }
      );
  
      // render the UI using a React component
      try {

        ReactDom.render(element, this._footer.domElement);
        console.warn(`[${Strings.ProjectName}] Update the footer links here: ${DataSource.HubUrl}/Lists/${Strings.FooterLinksList}`);
        return Promise.resolve();

      } catch (error) {
        
        console.error(error);
        Log.error(Strings.ProjectName, error);
        return Promise.reject();

      }

      window.addEventListener('beforeunload', (_e) => {
        this._footer.dispose();
      });

    } else return;  

  }

  private _onDispose(): void {
    console.log(`[${Strings.ProjectName}] Header footer disposed`);
  }

}