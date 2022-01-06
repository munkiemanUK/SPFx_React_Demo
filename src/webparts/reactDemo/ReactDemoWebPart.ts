import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactDemoWebPartStrings';
import ReactDemo from './components/ReactDemo';
import { IReactDemoProps } from './components/IReactDemoProps';

export interface IReactDemoWebPartProps {
  newDescription: string;
  
}

export default class ReactDemoWebPart extends BaseClientSideWebPart<IReactDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactDemoProps> = React.createElement(
      ReactDemo,
      {
        description: this.properties.newDescription,
        absoluteurl: this.context.pageContext.web.absoluteUrl,
        sitetitle: this.context.pageContext.web.title,
        relativeurl: this.context.pageContext.web.serverRelativeUrl,
        username: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
