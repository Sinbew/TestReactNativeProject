import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Route } from '../../constants/route';
import { INotificationService } from '../../service/notification/notification-service-interface';
import { useInjection } from 'inversify-react';
import { Type } from '../../ioc/type';
import { Notification } from '../../models/notifications/notification';
import { observer } from 'mobx-react-lite';

const EditNotificationScreen = observer(() => {

  const notificationService: INotificationService = useInjection(Type.NotificationService);
  const navigation = useNavigation();
  const params: any = useRoute().params;
  const incomeNotification: Notification = params.notification!;
  const [notification, setNotification] = useState<Notification>(incomeNotification);

  const updateNotification = async () => {
    try {
      await notificationService.updateNotification(notification);
      navigation.goBack();
    } catch (e) {
      console.warn(e);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainWrapper}>
        <TouchableOpacity activeOpacity={0.8}
                          onPress={() => navigation.navigate(Route.NOTIFICATIONS_SCREEN as never)}>
          <Text style={{fontSize: 22, color: 'royalblue'}}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <Text style={{color: 'grey', fontSize: 12}}>Subject</Text>
          <TextInput value={notification.subject} style={styles.input}
                     onChangeText={(text) => setNotification({...notification, subject: text})}/>
          <Text style={{color: 'grey', fontSize: 12}}>App name</Text>
          <TextInput value={notification.appName} style={styles.input}
                     onChangeText={(text) => setNotification({...notification, appName: text})}/>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.updateButton} onPress={updateNotification}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>Update</Text>
        </TouchableOpacity>
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
    padding: 15,
  },
  inputWrapper: {
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,

  },
  updateButton: {
    padding: 10,
    backgroundColor: 'royalblue',
    borderRadius: 10,

  },
  indicator: {
    flex: 1,
    alignSelf: 'center',
  }


});
export default EditNotificationScreen;

