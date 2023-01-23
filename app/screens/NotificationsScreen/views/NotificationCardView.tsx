import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Notification } from '../../../models/notifications/notification';


export interface NotificationCardViewProps {
  notification: Notification;
  onDeletePress?: () => void;
}

const NotificationCardView = (props: NotificationCardViewProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        <View>
          <Text>id: {props.notification.id}</Text>
          <Text>subject: {props.notification.subject}</Text>
          <Text>appName: {props.notification.appName}</Text>
        </View>
        <TouchableOpacity
          onPress={props.onDeletePress}
          style={styles.deleteButton}
          activeOpacity={0.8}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center'
  },
  mainWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteButton: {
    height: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default NotificationCardView;
