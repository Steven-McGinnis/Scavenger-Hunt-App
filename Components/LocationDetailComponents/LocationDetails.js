import React from 'react';
import { View } from 'react-native';
import {
    Card,
    Text,
    TextInput,
    Button,
    DefaultTheme,
} from 'react-native-paper';
import { FormattedMessage } from 'react-intl';

// Assuming these are from your custom constants or utilities:
import { themeColors } from '../../Styles/constants';
import { styles } from '../../Styles/styles';
import { customTheme } from '../../Styles/paperTheme';

// Version 1.0.0
export function LocationDetails({
    location,
    currentLocationName,
    currentLatitude,
    currentLongitude,
    currentClue,
    currentDescription,
    openLocationEdit,
    newLocationName,
    setNewLocationName,
    newClue,
    setNewClue,
    newDescription,
    setNewDescription,
    submitEditedLocationDetails,
    intl,
}) {
    return (
        <View style={styles.container}>
            <Card
                style={{
                    backgroundColor: themeColors.locationCardBackgroundColor,
                }}>
                <Card.Content>
                    <Text
                        style={{
                            color: themeColors.locationCardTextColor,
                            fontSize: themeColors.locationCardTextSize,
                        }}>
                        <FormattedMessage id='locationDetailScreen.locationName' />
                        {currentLocationName}
                    </Text>
                    <Text style={{ color: themeColors.locationCardTextColor }}>
                        <FormattedMessage id='locationDetailScreen.locationID' />
                        {location.locationid ? location.locationid : 'None'}
                    </Text>
                    <Text style={{ color: themeColors.locationCardTextColor }}>
                        <FormattedMessage id='locationDetailScreen.latitude' />
                        {currentLatitude ? currentLatitude : 'None'}
                    </Text>
                    <Text style={{ color: themeColors.locationCardTextColor }}>
                        <FormattedMessage id='locationDetailScreen.longitude' />
                        {currentLongitude ? currentLongitude : 'None'}
                    </Text>
                    <Text style={{ color: themeColors.locationCardTextColor }}>
                        <FormattedMessage id='locationDetailScreen.locationClue' />{' '}
                        {currentClue ? currentClue : 'None'}
                    </Text>
                    <Text style={{ color: themeColors.locationCardTextColor }}>
                        <FormattedMessage id='locationDetailScreen.locationDescription' />{' '}
                        {currentDescription ? currentDescription : 'None'}
                    </Text>

                    {openLocationEdit && (
                        <View>
                            <View style={styles.spacer2} />
                            <TextInput
                                activeOutlineColor={
                                    themeColors.textactiveOutlineColor
                                }
                                mode={themeColors.textMode}
                                label={intl.formatMessage({
                                    id: 'locationDetailScreen.locationName',
                                    defaultMessage: 'Location Name',
                                })}
                                value={newLocationName}
                                onChangeText={(text) =>
                                    setNewLocationName(text)
                                }
                                style={{
                                    backgroundColor:
                                        themeColors.locationCardBackgroundColor,
                                    marginBottom: 10,
                                    color: themeColors.locationCardTextColor,
                                }}
                            />

                            <TextInput
                                activeOutlineColor={
                                    themeColors.textactiveOutlineColor
                                }
                                mode={themeColors.textMode}
                                label={intl.formatMessage({
                                    id: 'locationDetailScreen.clue',
                                    defaultMessage: 'Clue',
                                })}
                                value={newClue}
                                onChangeText={(text) => setNewClue(text)}
                                style={{
                                    backgroundColor:
                                        themeColors.locationCardBackgroundColor,
                                    marginBottom: 10,
                                }}
                            />

                            <TextInput
                                activeOutlineColor={
                                    themeColors.textactiveOutlineColor
                                }
                                mode={themeColors.textMode}
                                label={intl.formatMessage({
                                    id: 'locationDetailScreen.locationDescription',
                                    defaultMessage: 'Location Description',
                                })}
                                multiline={true}
                                value={newDescription}
                                onChangeText={(text) => setNewDescription(text)}
                                style={{
                                    backgroundColor:
                                        themeColors.locationCardBackgroundColor,
                                    marginBottom: 10,
                                }}
                            />

                            <Button
                                mode={themeColors.buttonMode}
                                onPress={submitEditedLocationDetails}
                                style={styles.loginButton}
                                buttonColor={themeColors.buttonColor}>
                                {intl.formatMessage({
                                    id: 'locationDetailScreen.locationUpdateButton',
                                    defaultMessage: 'Update Location',
                                })}
                            </Button>
                        </View>
                    )}
                </Card.Content>
            </Card>
        </View>
    );
}
