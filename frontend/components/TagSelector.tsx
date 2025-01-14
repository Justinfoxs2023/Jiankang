import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Tag {
  id: string;
  name: string;
}

interface Props {
  tags: Tag[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  maxSelect?: number;
}

export const TagSelector: React.FC<Props> = ({
  tags,
  selectedTags,
  onChange,
  maxSelect = 3
}) => {
  const handleTagPress = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter(id => id !== tagId));
    } else if (selectedTags.length < maxSelect) {
      onChange([...selectedTags, tagId]);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tags.map(tag => (
        <TouchableOpacity
          key={tag.id}
          style={[
            styles.tag,
            selectedTags.includes(tag.id) && styles.selectedTag
          ]}
          onPress={() => handleTagPress(tag.id)}
          disabled={!selectedTags.includes(tag.id) && selectedTags.length >= maxSelect}
        >
          <Text style={[
            styles.tagText,
            selectedTags.includes(tag.id) && styles.selectedText
          ]}>
            {tag.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8
  },
  selectedTag: {
    backgroundColor: '#E8F5E9'
  },
  tagText: {
    fontSize: 14,
    color: '#666'
  },
  selectedText: {
    color: '#2E7D32'
  }
}); 