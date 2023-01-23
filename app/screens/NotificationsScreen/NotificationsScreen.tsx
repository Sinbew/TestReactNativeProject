import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useInjection } from 'inversify-react';
import { Type } from '../../ioc/type';
import { Notification } from '../../models/notifications/notification';
import { NotificationState } from '../../state/notification/notification-state';
import { NotificationService } from '../../service/notification/notification-service';
import NotificationCardView from './views/NotificationCardView';
import { observer } from 'mobx-react-lite';


const NotificationsScreen = observer(() => {

  const notificationService: NotificationService = useInjection(Type.NotificationService);
  const notificationState: NotificationState = useInjection(Type.NotificationState);

  // const [notification, setNotification] = useState<Notification[] | []>([]);
  // const [newNotification, setNewNotification] = useState<Notification>({subject: '', appName: '', id: ''});
  const notifications = notificationState.getNotifications();

  useEffect(() => {}, [notifications.length]);

  // const addNotification = async () => {
  //   try {
  //     newNotification.id = uuid.v4().toString();
  //     await notificationService.addNotification(newNotification);
  //     setNewNotification({subject: '', appName: '', id: ''});
  //
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };
  //
  const removeNotification = async (notification: Notification) => {
    try {
      await notificationService.removeNotification(notification);
    } catch (e) {
      console.warn(e);
    }
  };

  const renderNotification = ({item}: {item: Notification}) => {
    return <NotificationCardView
      key={item.id}
      notification={item}
      onDeletePress={() => removeNotification(item)}
    />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          style={{paddingTop: 15}}
          ItemSeparatorComponent={() => <View style={{height: 8}} />}
        />
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
    borderWidth: 2,
    paddingHorizontal: 15
  },
  notification: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    width: '70%',
    borderColor: 'royalblue',
    alignSelf: 'flex-start'
  },
  subjectAndTime: {
    flexDirection: 'row',
  },
  time: {
    marginLeft: 'auto'
  },

  addNotificationButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  removeItemsButton: {
    marginLeft: 'auto',
  },
  input: {
    borderWidth: 2,
    marginBottom: 5,
    borderColor: 'black'
  }

});

export default NotificationsScreen;
