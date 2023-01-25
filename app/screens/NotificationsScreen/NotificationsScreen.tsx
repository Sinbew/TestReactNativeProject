import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {Notification} from '../../models/notifications/notification';
import {NotificationState} from '../../state/notification/notification-state';
import NotificationCardView from './views/NotificationCardView';
import {observer} from 'mobx-react-lite';
import AddNotificationView from './views/AddNotificationView';
import {INotificationService} from '../../service/notification/notification-service-interface';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../constants/route';


const NotificationsScreen = observer(() => {

    const notificationService: INotificationService = useInjection(Type.NotificationService);
    const notificationState: NotificationState = useInjection(Type.NotificationState);
    const navigation = useNavigation();
    const notifications = notificationState.getNotifications();


    useEffect(() => {
    }, [notifications.length]);

    const addNotification = async (notification: Notification) => {
        try {
            await notificationService.addNotification(notification);
        } catch (e) {
            console.error(e);
        }
    };

    const removeNotification = async (notification: Notification) => {
        try {
            await notificationService.removeNotification(notification);
        } catch (e) {
            console.warn(e);
        }
    };
    const editNotification = async (notification: Notification) => {
        try {
            navigation.navigate(Route.EDIT_NOTIFICATION_SCREEN as never, {notification} as never);
        } catch (e) {
            console.warn(e);
        }
    };

    const renderNotification = ({item}: { item: Notification }) => {
        return <NotificationCardView
            key={item.id}
            notification={item}
            onDeletePress={() => removeNotification(item)}
            onEditPress={() => editNotification(item)}
        />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainWrapper}>
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    style={{paddingTop: 15}}
                    ItemSeparatorComponent={() => <View style={{height: 8}}/>}
                />
                <AddNotificationView addNotification={addNotification}/>
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
});

export default NotificationsScreen;
