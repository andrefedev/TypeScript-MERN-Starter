import React from "react";
import { ListItem, Thumbnail, Text, View } from "native-base";
import { Image } from "react-native";
import { Link, RouteComponentProps, withRouter } from "react-router-native";
import Article from "../../core/src/models/Article";
import ArticleActionCreator from "../../core/src/models/client/ArticleActionCreator";
import User from "../../core/src/models/User";
import connectPropsAndActions from "../../core/src/shared/connect";
import AppState from "../../core/src/models/client/AppState";
import { getAvatarSource, amendImageUrl } from "../utils/image";
import moment from "moment";
import { getArticleAbstract, getArticleCoverImage } from "../../core/src/shared/string";
import { MINIMUM_ARTICLE_LENGTH } from "../../core/src/shared/constants";

interface Props extends RouteComponentProps<any> {
    value: Article;
    state: AppState;
    actions: ArticleActionCreator;
}

interface States {}

class ArticleItem extends React.Component<Props, States> {
    render(): any {
        const article: Article = this.props.value;
        const createDate: Date = article.createdAt ? new Date(article.createdAt) : new Date(0);
        const articleAuthor: User = this.props.state.userDictionary[article.author];
        const coverSrc: string = amendImageUrl(getArticleCoverImage(article.content));
        return <Link to={{
                pathname: `${this.props.match.url}/${article._id}`,
                state: article
            }} component={ListItem} noIndent style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "white",
                marginTop: 6
            }}>
            <View style={{marginBottom: 2}}>
                <Text numberOfLines={2} style={{fontWeight: "bold", fontSize: 18}}>{article.title}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6
            }}>
            <View style={{flex: 1}}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 4
                }} >
                    <Thumbnail style={{width: 24, height: 24, marginRight: 4}} source={ getAvatarSource(articleAuthor.avatarUrl) } />
                    <Text style={{color: "#010101"}}>{articleAuthor.name}</Text>
                </View>
                <View style={{marginVertical: 4}}>
                    <Text numberOfLines={3}>{getArticleAbstract(article.content, MINIMUM_ARTICLE_LENGTH)}</Text>
                </View>
                <View style={{marginVertical: 4}}>
                    <Text style={{color: "grey"}}>
                        {moment(createDate).fromNow()}
                    </Text>
                </View>
            </View>
            <View style={{flex: 0, marginHorizontal: 6}}>
                {
                    coverSrc ? <Image resizeMode="contain" style={{height: 120, width: 100}} source={{uri: coverSrc}}/> : undefined
                }
            </View>
            </View>
        </Link>;
    }
}

export default withRouter(connectPropsAndActions(ArticleItem));