import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {UserState} from '../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../ioc/type';
import {Notification} from '../../models/notifications/notification';
import {NotificationState} from '../../state/notification/notification-state';
import {observer} from 'mobx-react-lite';
import {NotificationService} from '../../service/notification/notification-service';
import {AsyncStorageKey} from '../../constants/async-storage-key';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


const NotificationsScreen = () => {
    const notificationService: NotificationService = useInjection(Type.NotificationService);
    const notificationState: NotificationState = useInjection(Type.NotificationState);

    const [notification, setNotification] = useState<Notification[] | []>([]);
    const [newNotification, setNewNotification] = useState<Notification>({subject: '', appName: '', id: ''});
    const addItem = async () => {
        try {
            newNotification.id = uuid.v4().toString();
            await notificationService.addNotification(newNotification);
            setNewNotification({subject: '', appName: '', id: ''});

        } catch (e) {
            console.warn(e);
        }
    };
    const removeItem = async (id: string) => {
        try {
            console.warn(id);
            await notificationService.removeNotification(id);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        notificationService.getNotification().then((data) => {
            return data && setNotification(data);

        });

    });
    return (
        <ScrollView style={{padding: 40}}>


            {notification.length !== 0 ?
                <View style={styles.container}>
                    {notification.map((el) => {
                        return (<View key={el.id} style={styles.notification}>
                            <Text>{el.appName}</Text>
                            <View style={styles.subjectAndTime}>
                                <Text>{el.subject}</Text>
                                {/*<Text style={styles.time}>{el.time}</Text>*/}
                                <TouchableOpacity onPress={() => removeItem(el.id)} style={styles.removeItemsButton}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>

                        </View>);
                    })}
                </View> : null}
            <TouchableOpacity onPress={addItem} style={styles.addNotificationButton}>
                <Text>+</Text>
            </TouchableOpacity>
            <View>
                <TextInput style={styles.input}
                           value={newNotification.subject}
                           onChangeText={(text) => setNewNotification({...newNotification, subject: text})}
                />
                <TextInput style={styles.input}
                           value={newNotification.appName}
                           onChangeText={(text) => setNewNotification({...newNotification, appName: text})}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
