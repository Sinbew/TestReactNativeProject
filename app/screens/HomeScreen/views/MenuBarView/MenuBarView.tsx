import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import MenuCardView from '../MenuCardView/MenuCardView';
import {LocalizationText} from '../../../../localizations/localization-text';

export interface MenuBarViewProps {
    containerStyle?: StyleProp<ViewStyle>;
    onAboutPress?: () => void;
    onSettingsPress?: () => void;
}

const MenuBarView = (props: MenuBarViewProps) => {

    return (
        <View style={[styles.container, props.containerStyle]}>
            <MenuCardView icon='about' title={LocalizationText.menuBarAboutTitle} description={LocalizationText.menuBarAboutText}
                          onPress={props.onAboutPress}/>
            <MenuCardView icon='settings' title={LocalizationText.menuBarSettingsTitle} description={LocalizationText.menuBarSettingsText}
                          onPress={props.onSettingsPress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default MenuBarView;
