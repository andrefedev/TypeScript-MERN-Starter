import React, { Fragment } from "react";
import { match, Route, RouteComponentProps } from "react-router-native";
import ArticleItem from "./ArticleItem";
import { Header, Title, Body, Content, List } from "native-base";
import TabNavigator from "../Nav/TabNavigator";
import AppState from "../../core/src/models/client/AppState";
import ActionCreator from "../../core/src/models/client/ActionCreator";
import connectPropsAndActions from "../../core/src/shared/connect";
import Article from "../../core/src/models/Article";

interface Props extends RouteComponentProps<any> {
    state: AppState;
    actions: ActionCreator;
}

interface States {}

class ArticleList extends React.Component<Props, States> {
    componentDidMount() {
        // get all articles
        if (!this.props.state.articles.valid) {
            this.props.actions.getAllArticles();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.state.articles.valid && !this.props.state.articles.valid) {
            this.props.actions.getAllArticles();
        }
    }
    render(): any {
        const match: match<any> = this.props.match;
        return <Fragment>
            <Header noLeft>
                <Body>
                    <Title>Typescript MERN Starter</Title>
                </Body>
            </Header>
            <Content>
                <List>
                    {
                        this.props.state.articles.data.map(
                            (value: Article) => (<ArticleItem value={value} key={value._id} />)
                        )
                    }
                </List>
            </Content>
            {/* only show Footer in list page, do not show Footer in detail page */}
            <Route exact path={match.path} component={TabNavigator} />
        </Fragment>;
    }
}

export default connectPropsAndActions(ArticleList);