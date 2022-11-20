import { gql } from '@apollo/client';

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_songs(
      objects: {
        title: $title
        artist: $artist
        duration: $duration
        thumbnail: $thumbnail
        url: $url
      }
    ) {
      affected_rows
    }
  }
`;
