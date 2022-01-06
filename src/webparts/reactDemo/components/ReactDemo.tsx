import * as React from 'react';
import styles from './ReactDemo.module.scss';
import { IReactDemoProps } from './IReactDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IReactDemoState{
  stageTitle: string;
}

export default class ReactDemo extends React.Component<IReactDemoProps, IReactDemoState> {

  public constructor(props: IReactDemoProps, state: IReactDemoState)
  {
    super(props);
    this.state = {
      stageTitle: 'component Constructor has been called'
    };
    this.updateState = this.updateState.bind(this);
    console.log('Stage Title from Constructor : '+ this.state.stageTitle);
  }  

  public componentWillMount(): void {
    console.log('component will mount has been called');    
  }

  public componentDidMount(): void {
    console.log('stage title from componentDidMount : ' + this.state.stageTitle);
    this.setState({
      stageTitle:'componentDidMount has been called'
    });  
  }

  public updateState(){
    this.setState({
      stageTitle: 'updateState has been called'
    });
  }

  public render(): React.ReactElement<IReactDemoProps> {
    return (
      <div className={ styles.reactDemo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint Using React!</span>
              <h3>{this.state.stageTitle}</h3>
              <p className={ styles.description }>Absolute URL: {escape(this.props.absoluteurl)}</p>
              <p className={ styles.description }>Site Title: {escape(this.props.sitetitle)}</p>
              <p className={ styles.description }>Relative URL: {escape(this.props.relativeurl)}</p>
              <p className={ styles.description }>Username: {escape(this.props.username)}</p>
              <button className={styles.button} onClick={this.updateState}>Click Here to Update State</button>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentWillUnmount(): void {
    console.log('Component will unmount has been called');
  }
}
