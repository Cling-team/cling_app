import { StyleSheet } from 'react-native';

export const commentComposerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: 'white',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  input: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6E56CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
