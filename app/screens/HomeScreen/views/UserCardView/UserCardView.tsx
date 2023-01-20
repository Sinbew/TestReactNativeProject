import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {User} from '../../../../models/user/user';
import {UserState} from '../../../../state/user/user-state';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';

export interface UserCardViewProps {
    user: User | null;
}

const UserCardView = ({user}: UserCardViewProps) => {

    const userState: UserState = useInjection(Type.UserState);

    const [changeFirstName, setChangeFirstName] = useState<string>(user ? user.firstName : '');
    const [changeLastName, setChangeLastName] = useState<string>(user ? user.lastName : '');


    const updateUserInfo = async () => {
        if (changeFirstName && changeLastName && user) {
            const updatedUser: User = {
                firstName: changeFirstName,
                lastName: changeLastName,
                email: user.email,
            };
            await userState.setUser(updatedUser);
            await userState.getUser();
        }
    };
    if (user) {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Enter your name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setChangeFirstName(val)}
                    />
                    <Text>Enter your last name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => setChangeLastName(val)}
                    />
                </View>

                <Text>{user.firstName}</Text>
                <Text style={{marginTop: 5}}>{user.lastName}</Text>
                <Text style={{marginTop: 5}}>{user.email}</Text>

                <Button title={'Update info'} onPress={updateUserInfo}></Button>
            </View>

        );
    } else {
        return null;
    }

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 4,
        marginBottom: 5,
        marginTop: 5,

        width: 200,
    }
});

export default UserCardView;
