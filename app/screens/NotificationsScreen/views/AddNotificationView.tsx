import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Notification} from '../../../models/notifications/notification';
import uuid from 'react-native-uuid';

export interface AddNotificationViewProps {
    addNotification: (notification: Notification) => void;
}

const AddNotificationView = (props: AddNotificationViewProps) => {

    const emptyNotification: Notification = {subject: '', appName: '', id: ''};
    const [notification, setNotification] = useState(emptyNotification);

    const addNotification = () => {
        const notificationToAdd = {...notification};
        notificationToAdd.id = uuid.v4().toString().slice(0, 8);
        props.addNotification(notificationToAdd);
        setNotification(emptyNotification);
    };

    return (<View>
        <Text>Subject</Text>
        <TextInput value={notification.subject}
                   style={styles.input}
                   onChangeText={(text) => setNotification({...notification, subject: text})}
        />
        <Text>AppName</Text>
        <TextInput
            value={notification.appName}
            style={styles.input}
            onChangeText={(text) => setNotification({...notification, appName: text})}
        />
        <TouchableOpacity
            onPress={addNotification}
            activeOpacity={0.8} style={styles.addNotificationButton}>
            <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
    </View>);
};


const styles = StyleSheet.create({

    addNotificationButton: {
        width: '100%',
        height: 40,
        borderRadius: 12,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'royalblue',
    }, input: {
        borderWidth: 1, marginBottom: 5, borderRadius: 12, padding: 10, borderColor: 'black'
    }
});
export default AddNotificationView;
