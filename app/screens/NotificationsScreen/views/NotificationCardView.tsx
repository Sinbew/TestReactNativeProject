import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Notification } from '../../../models/notifications/notification';


export interface NotificationCardViewProps {
  notification: Notification;
  onDeletePress?: () => void;
  onEditPress?: () => void;
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
          onPress={props.onEditPress}
          style={styles.editButton}
          activeOpacity={0.8}
        >
          <Text style={{color: 'royalblue'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onDeletePress}
          style={styles.deleteButton}
          activeOpacity={0.8}
        >
          <Text style={{color: '#fff'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: '#e5e5e5',
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center'
  },
  mainWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteButton: {
    height: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'royalblue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    height: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 12,
    backgroundColor: '#dbdbdb'
  }
});


export default NotificationCardView;
