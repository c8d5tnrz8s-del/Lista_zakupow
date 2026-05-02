import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from './theme';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.log('Błąd aplikacji:', error, info);
  }

  resetError = () => {
    this.setState({
      hasError: false
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.xl,
            backgroundColor: theme.colors.background
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.title,
              fontWeight: 'bold',
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
              textAlign: 'center'
            }}
          >
            Wystąpił błąd aplikacji
          </Text>

          <Text
            style={{
              fontSize: theme.fontSize.normal,
              color: theme.colors.textLight,
              textAlign: 'center',
              marginBottom: theme.spacing.lg
            }}
          >
            Coś poszło nie tak. Możesz spróbować wrócić do aplikacji.
          </Text>

          <TouchableOpacity
            onPress={this.resetError}
            style={{
              backgroundColor: theme.colors.warning,
              padding: theme.spacing.md,
              borderRadius: theme.radius.sm
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              Spróbuj ponownie
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}