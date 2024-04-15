import * as React from 'react';
import { Stack } from '@fluentui/react';
import { IPortalFooterProps, IPortalFooterState } from '../interfaces';
import { IFooterLinksItem, IHubSiteData } from "../hubData/ds";
import { DefaultButton, Icon } from 'office-ui-fabric-react';
import styles from './footer.module.scss';
import * as strings from 'CustomFooterApplicationCustomizerStrings';

const mandoItemStyles: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20
};

export class PortalFooter extends React.Component<IPortalFooterProps, IPortalFooterState>{
    constructor(props: IPortalFooterProps){
        super(props);

        this.state = {
            expanded: false,
            toggleButtonIconName: 'DoubleChevronUp',
            loadingLinks: true,
            links: props.links,
            hubData: props.hubData
        };
    }

    private _handleToggle = (): void => {
        const wasExpanded: boolean = this.state.expanded;
        this.setState({
          expanded: !wasExpanded,
          toggleButtonIconName: wasExpanded ? 'DoubleChevronUp' : 'DoubleChevronDown'
        });
    }

    // set a manual timeout loop since my await function on the customizer was not awaiting to resolve
    private _checkLinks = (): void => {
        if(this.props.links.length === 0){
            setTimeout(() => { this._checkLinks(); }, 100);
        } else {
            this.setState({
                loadingLinks: false
            });
        }
    }

    public render(): React.ReactElement<IPortalFooterProps>{

        let hub: IHubSiteData = this.props.hubData as any;
        const groupItems:IFooterLinksItem[] = [];
        const mandoItems:IFooterLinksItem[] = [];
        const stickyItems:IFooterLinksItem[] = [];
        const supportItems:IFooterLinksItem[] = [];   
        const commandAddress:IFooterLinksItem[] = [];  

        this.props.links.filter((item) => {
            switch (item.header) {
                case "_MandatoryLink":
                    mandoItems.push(item);
                    break;
                case "_StickyLink":
                    stickyItems.push(item);
                    break;
                case "_SupportLink":
                    supportItems.push(item);
                    break;
                case "_CommandAddress":
                    commandAddress.push(item);
                    break;
                default:
                    groupItems.push(item);
                    break;
            }
        });

        return(
            <div className={styles.CustomFooterContainer} onLoad={this._checkLinks}>
                <div className={`${styles.CustomFooterPopup} ${this.state.expanded ? styles.visible : styles.hidden}`}>
                    <div className={styles.CustomFooterPopupTop}>
                        <div className={styles.linksGroupContainer}>
                            {groupItems.map(item =>
                            <div className={styles.linkGroup}>
                                <div className={styles.linkHeader} key={item.header}>{item.header}</div>
                                <div>
                                    <ul>
                                        {item.links.map(link => <li key={link.id}>
                                            <a href='#' onClick={ () => window.open(`${link.link}`, '_blank')}>{link.title}</a>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className={styles.commandGroupContainer}>
                            {commandAddress.map(item => 
                            <div key={item.header} className={styles.commandGroup}>
                                <div className={styles.linkHeader}>Command Information</div>
                                    {item.links.map(command =>                                     
                                    <div key={command.id} dangerouslySetInnerHTML={{ __html: command.address}}></div>
                                    )}
                                <div><img className={styles.commandLogo} alt={hub.name} src={hub.logo} /></div>
                            </div>
                            )}
                        </div>
                    </div>
                    {mandoItems.map(item => 
                    <div className={styles.CustomFooterPopupBottom}>
                        <Stack key={item.header} horizontal horizontalAlign='center'>
                            {item.links.map(link => 
                            <div key={link.id} style={mandoItemStyles}>
                                <a href='#' onClick={ () => window.open(`${link.link}`, '_blank')}><img alt={link.title} src={link.image} /></a>
                            </div>
                            )}  
                        </Stack>
                    </div>
                    )}
                </div>
                <div className={styles.CustomFooterSticky} >
                    <div className={styles.commandSticky}>
                        <div className={styles.commandLogoSticky} onClick={ () => window.open(`${hub.url}`)}>
                            <img title={hub.name} src={hub.logo} />
                        </div>
                        <div className={styles.commandTitle} onClick={ () => window.open(`${hub.url}`)}>{hub.name}</div>
                        <div>
                            <div className={styles.toggleControl}>
                            <DefaultButton
                                iconProps={{ iconName: this.state.toggleButtonIconName }}
                                title={this.state.expanded ? strings.ToggleButtonClose : strings.ToggleButtonOpen}
                                className={styles.toggleButton}
                                onClick={this._handleToggle}
                            />
                            </div>
                        </div>
                    </div>
                    {stickyItems.map(item => 
                    <div key={item.header} className={styles.stickyLinks}>
                        {item.links.map(link =>
                        <div key={link.id}><a href='#' onClick={ () => window.open(`${link.link}`, '_blank')}>{link.title}</a></div>
                        )}
                    </div>
                    )}
                    {supportItems.map(item => 
                    <div key={item.header} className={styles.support}>
                        {item.links.map(link =>
                        <div key={link.id} onClick={ () => window.open(`${link.link}`)}>
                            <div><Icon iconName='Headset'></Icon></div>
                            <div>{link.title}</div>
                        </div>
                        )}
                    </div>
                    )}
                </div>
          </div>
        );
    }
}