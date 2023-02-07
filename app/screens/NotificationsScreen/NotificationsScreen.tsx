import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity, useWindowDimensions,
  View
} from 'react-native';
import { useInjection } from 'inversify-react';
import { Type } from '../../ioc/type';
import { NotificationsState } from '../../state/notifications/notifications-state';
import ScreenHeader from '../../components/headers/ScreenHeader/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../constants/color';
import { Font } from '../../constants/fonts/font';
import { Notification } from '../../models/notification/notification';
import { LocalizationText } from '../../localizations/localization-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INotificationsService } from '../../service/notifications/notifications-service-interface';

const NotificationsScreen = () => {

  const notificationService: INotificationsService = useInjection(Type.NotificationsService);
  const notificationsState: NotificationsState = useInjection(Type.NotificationsState);
  const notifications = notificationsState.getNotifications();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    initNotifications();
  }, []);

  const initNotifications = async () => {
    try {
      setLoading(true);
      await notificationService.initNotifications();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const renderItem = ({item}: { item: Notification }) => {
    return (
      <TouchableOpacity style={styles.notificationWrapper} activeOpacity={0.8}>
        <Image source={{uri: item.thumbnail}} style={styles.image} resizeMode='cover'/>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{item.title}</Text>
          <Text numberOfLines={2} style={[styles.text, styles.description]}>{item.description}</Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={[styles.priceText]}>{item.price} $</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Separator = () => {
    return <View style={styles.separator}/>;
  };

  const EmptyComponent = () => {
    if (loading) {
      const containerHeight = height - insets.top - 40;
      return (
        <View style={[styles.loaderContainer, {height: containerHeight}]}>
          <ActivityIndicator/>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScreenHeader
        title={LocalizationText.notifications}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.mainWrapper}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          scrollEnabled={!loading}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={EmptyComponent}
        />
      </View>

    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color['#191B20'],
  },
  mainWrapper: {
    flex: 1,
  },
  list: {
    paddingVertical: 20
  },
  notificationWrapper: {
    width: '92%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color['#242731'],
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent'
  },
  image: {
    height: 60,
    width: 100,
    borderRadius: 12
  },
  textWrapper: {
    width: '40%'
  },
  text: {
    color: Color['#ffffff'],
    marginLeft: 20,
    fontFamily: Font.rubik,
    fontSize: 12,

  },
  description: {
    marginTop: 10,
    color: Color['#808191']
  },
  priceWrapper: {
    marginLeft: 'auto',
    backgroundColor: Color['#1F2128'],
    paddingVertical: 16,
    borderRadius: 16,
    width: '20%'
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    color: Color['#ffffff'],
    alignSelf: 'center',
    fontFamily: Font.rubik,
    fontSize: 12
  }
});
