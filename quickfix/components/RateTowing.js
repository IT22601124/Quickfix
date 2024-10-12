import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Feedback = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const emojis = [
    {label: 'very bad', image: require('../assets/very_bad.jpg')}, // replace with actual emoji images
    {label: 'bad', image: require('../assets/bad.png')},
    {label: 'neutral', image: require('../assets/neutral.jpeg')},
    {label: 'good', image: require('../assets/good.png')},
    {label: 'very good', image: require('../assets/very_good.jpg')},
  ];

  // Handle feedback submission
  const handleSubmit = async () => {
    if (selectedRating === null) {
      alert('Please select a rating.');
      return;
    }

    const feedbackData = {
      email: email,
      rating: selectedRating + 1, // Convert index (0-4) to rating (1-5)
      comment: comment,
    };

    try {
      const response = await fetch('http://192.168.57.110:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Clear the form and navigate
        setSelectedRating(null);
        setEmail('');
        setComment('');
        navigation.navigate('Service');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back and profile icons */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // your logo
          style={styles.logo}
        />
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile-icon.jpeg')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Give Feedback</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail} // Bind email state
      />

      {/* Rating Section */}
      <Text style={styles.label}>Rate your Experience:</Text>
      <View style={styles.ratingContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedRating(index)} // Select rating on tap
            style={[
              styles.emojiContainer,
              selectedRating === index && styles.selectedEmoji, // Highlight selected
            ]}>
            <Image source={emoji.image} style={styles.emoji} />
            <Text style={styles.emojiText}>{emoji.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Section */}
      <Text style={styles.label}>Comment, if any?</Text>
      <TextInput
        style={[styles.input, styles.commentBox]}
        multiline
        numberOfLines={4}
        placeholder="Enter your comment"
        value={comment}
        onChangeText={setComment} // Bind comment state
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText} onPress={handleSubmit}>
          Publish Feedback
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA', // Light background color
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0073e6',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: -20,
  },
  logo: {
    width: 75,
    height: 50,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emojiContainer: {
    alignItems: 'center',
  },
  emoji: {
    width: 50,
    height: 50,
  },
  emojiText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  selectedEmoji: {
    borderWidth: 2,
    borderColor: '#4db8ff',
    borderRadius: 50,
  },
  commentBox: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#0073e6',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Feedback;
