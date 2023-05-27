import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as strings from 'BnpreNewsLatestDocsUploadedApplicationCustomizerStrings';

// Custom
import Constants from './helpers/Constants';
import { IReactLatestDocumentsProps } from './components/LatestDocuments/IReactLatestDocumentsProps';
import ReactNews from './components/LatestDocuments/ReactLatestDocuments';

import * as $ from 'jquery';
import * as bootstrap from "bootstrap";

const LOG_SOURCE: string = 'BnpreNewsLatestDocsUploadedApplicationCustomizer';

export interface IBnpreNewsLatestDocsUploadedApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Header: string;
  Footer: string;
  StyleToggle: string;
  AuthorToggle: string;
  Site: any[];
  listTitle: string;
  listViewTitle: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BnpreNewsLatestDocsUploadedApplicationCustomizer
  extends BaseApplicationCustomizer<IBnpreNewsLatestDocsUploadedApplicationCustomizerProperties> {

  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.info("DocsDsiTickerApplicationCustomizer : La fonction onInit() appelé !!!!!!")
    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    return Promise.resolve<void>();
  }


  private _renderPlaceHolders(): void {

    console.info("DocsDsiTickerApplicationCustomizer : La fonction _renderPlaceHolders() appelé !!!!!!")
    // Header 
    console.info('Available placeholders: ', this.context.placeholderProvider.placeholderNames
      .map(name => PlaceholderName[name])
      .join(', ')
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Header;
        if (!topString) {
          topString = '(Top property was not defined.)';
        }

        if (this._topPlaceholder.domElement) {
          // Find existing element
          const existingElement = document.getElementById(Constants.ROOT_ID);

          // Stop if another news ticker found
          if (document.body.contains(existingElement)) return;
          const element: React.ReactElement<IReactLatestDocumentsProps> = React.createElement(
            ReactNews,
            {
              StyleToggle: this.properties.StyleToggle,
              AuthorToggle: this.properties.AuthorToggle,
              // sites: this.properties.sites,
              context: this._topPlaceholder,
              Site: this.properties.Site,
              listTitle: this.properties.listTitle,
              listViewTitle: this.properties.listViewTitle
            }
          );
          ReactDom.render(element, this._topPlaceholder.domElement);
        }

        // // FOOTER
        // if (!this._bottomPlaceholder) {
        //   this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        //     PlaceholderName.Bottom,
        //     { onDispose: this._onDispose }
        //   );

        //   // The extension should not assume that the expected placeholder is available.
        //   if (!this._bottomPlaceholder) {
        //     console.error('The expected placeholder (Bottom) was not found.');
        //     return;
        //   }

        //   if (this.properties) {
        //     let bottomString: string = this.properties.Footer;
        //     if (!bottomString) {
        //       bottomString = '(Bottom property was not defined.)';
        //     }

        //     if (this._bottomPlaceholder.domElement) {
        //       this._bottomPlaceholder.domElement.innerHTML = `
        //   <div class='${styles.app}'>
        //     <div class='${styles.bottom}'>
        //       <i class='ms-Icon ms-Icon--Info' aria-hidden='true'></i> ${escape(
        //         bottomString
        //       )}
        //     </div>
        //   </div>`;
        //     }
        //   }
        // }
      }
    }
  }
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
