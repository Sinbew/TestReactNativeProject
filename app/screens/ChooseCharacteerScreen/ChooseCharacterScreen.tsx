import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import SheetId from '../../constants/sheet-id';

const ChooseCharacterScreen = () => {

    useEffect(() => {
        sheetInit();
    });

    const sheetInit = async () => {
        await SheetManager.show(SheetId.chooseCharacter);
    };
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Hello
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default ChooseCharacterScreen;
