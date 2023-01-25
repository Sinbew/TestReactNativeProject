import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {User} from '../../../../models/user/user';
import {observer} from 'mobx-react-lite';
import {useInjection} from 'inversify-react';
import {Type} from '../../../../ioc/type';
import {UserState} from '../../../../state/user/user-state';

export interface UserCardViewProps extends ViewProps {
}

const UserCardView = observer((props: UserCardViewProps) => {

    const userState: UserState = useInjection(Type.UserState);
    const user: User | null = userState.getUser();

    useEffect(() => {
    }, [user]);

    if (user) {
        return (<View {...props} style={[styles.container, props.style]}>
            <Text>{user.firstName}</Text>
            <Text>{user.lastName}</Text>
            <Text>{user.email}</Text>
        </View>);
    } else {
        return null;
    }

});

const styles = StyleSheet.create({
    container: {
        width: '100%', borderWidth: 1, borderRadius: 12, padding: 12
    }, input: {
        borderWidth: 1, borderColor: '#777', padding: 4, marginBottom: 5, marginTop: 5,

        width: 200,
    }
});

export default UserCardView;
