import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../Styles/styles';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { addAuthToken } from '../Model/Slices/authSlice';
import { useIntl, FormattedMessage } from 'react-intl'; // Added

const Register = ({ navigation }) => {
	const dispatch = useDispatch();
	const intl = useIntl(); // Initialized

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleRegister = () => {
		if (!username || !password || !password2) {
			setSnackbarMessage(
				intl.formatMessage({
					id: 'register.enterUsernameAndPassword',
					defaultMessage: 'Please enter a username and password',
				})
			);
			setSnackbarVisible(true);
			return;
		}

		if (password !== password2) {
			setSnackbarMessage(
				intl.formatMessage({
					id: 'register.passwordMismatch',
					defaultMessage: 'Passwords do not match',
				})
			);
			setSnackbarVisible(true);
			return;
		}

		let formData = new FormData();
		formData.append('userid', username);
		formData.append('password', password);

		fetch('https://cpsc345sh.jayshaffstall.com/register.php', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === 'okay') {
					console.log('Registered successfully!', data);
					dispatch(addAuthToken(data.token));
					navigation.navigate('ScavengerScreen');
				} else if (data.status === 'error') {
					console.error('Registration error:', data.error);

					setSnackbarMessage(data.error[0]);
					setSnackbarVisible(true);
				}
			})
			.catch((error) => {
				console.error('Network or other error:', error);
				setSnackbarMessage('Failed to register. Please try again.');
				setSnackbarVisible(true);
			});
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}>
			<ScrollView>
				<View style={styles.container}>
					<Snackbar
						visible={snackbarVisible}
						onDismiss={() => setSnackbarVisible(false)}
						duration={Snackbar.DURATION_SHORT}>
						{snackbarMessage}
					</Snackbar>
					<Card style={styles.card}>
						<Card.Title
							title={
								<FormattedMessage
									id='register.title'
									defaultMessage='Register'
								/>
							}
							subtitle={
								<FormattedMessage
									id='register.subtitle'
									defaultMessage='Create Account'
								/>
							}
						/>
						<Card.Content>
							<TextInput
								label={intl.formatMessage({
									id: 'register.usernameLabel',
									defaultMessage: 'Username',
								})}
								value={username}
								onChangeText={(text) => setUsername(text)}
								style={styles.input}
							/>
							<TextInput
								label={intl.formatMessage({
									id: 'register.passwordLabel',
									defaultMessage: 'Password',
								})}
								value={password}
								onChangeText={(text) => setPassword(text)}
								secureTextEntry
								style={styles.input}
							/>
							<TextInput
								label={intl.formatMessage({
									id: 'register.reenterPasswordLabel',
									defaultMessage: 'Re-enter Password',
								})}
								value={password2}
								onChangeText={(text) => setPassword2(text)}
								secureTextEntry
								style={styles.input}
							/>
							<View style={styles.spacer} />
							<Button
								mode='contained'
								onPress={handleRegister}
								style={styles.loginButton}
								buttonColor='green'>
								{intl.formatMessage({
									id: 'register.registerButton',
									defaultMessage: 'Register',
								})}
							</Button>
						</Card.Content>
					</Card>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Register;