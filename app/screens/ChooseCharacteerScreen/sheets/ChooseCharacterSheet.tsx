import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import SheetId from '../../../constants/sheet-id';
import {observer} from 'mobx-react-lite';

const ChooseCharacterSheet = observer(() => {

    return (
        <ActionSheet containerStyle={styles.container} id={SheetId.chooseCharacter}>
            <View>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
                <Text>KEK</Text>
            </View>
        </ActionSheet>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default ChooseCharacterSheet;
