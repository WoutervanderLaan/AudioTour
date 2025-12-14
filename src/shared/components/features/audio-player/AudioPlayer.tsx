import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Pressable, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Audio} from 'expo-av'

import {logger} from '@/core/lib/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable'
import {Text} from '@/shared/components/ui/typography'

/**
 * AudioPlayerProps
 * Props for the AudioPlayer component
 */
type AudioPlayerProps = {
  /**
   * Audio source URL
   */
  src: string
}

/**
 * formatTime
 * Formats milliseconds to MM:SS format
 *
 * @param millis - Time in milliseconds
 * @returns Formatted time string
 */
const formatTime = (millis: number): string => {
  const totalSeconds = Math.floor(millis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/**
 * AudioPlayer
 * Component that provides audio playback controls for narrative audio tracks.
 * Supports play/pause, seek, and displays playback progress.
 *
 * @param props - Component props with audio source URL
 * @returns Audio player component with controls
 */
export const AudioPlayer = ({src}: AudioPlayerProps): React.JSX.Element => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | undefined>(undefined)

  /**
   * loadSound
   * Loads the audio file from the source URL
   *
   * @returns Promise that resolves when sound is loaded
   */
  const loadSound = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(undefined)

      logger.debug('[AudioPlayer] Loading sound:', src)

      const {sound: newSound} = await Audio.Sound.createAsync(
        {uri: src},
        {shouldPlay: false},
        onPlaybackStatusUpdate,
      )

      setSound(newSound)
      logger.debug('[AudioPlayer] Sound loaded')
    } catch (err) {
      logger.error('[AudioPlayer] Error loading sound:', err)
      setError('Failed to load audio')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * onPlaybackStatusUpdate
   * Callback for audio playback status updates
   *
   * @param status - Playback status object
   * @returns void
   */
  const onPlaybackStatusUpdate = (status: Audio.SoundStatus): void => {
    if (status.isLoaded) {
      setPosition(status.positionMillis)
      setDuration(status.durationMillis || 0)
      setIsPlaying(status.isPlaying)

      if (status.didJustFinish) {
        setIsPlaying(false)
        setPosition(0)
      }
    }
  }

  /**
   * togglePlayback
   * Toggles between play and pause
   *
   * @returns Promise that resolves when playback state changes
   */
  const togglePlayback = async (): Promise<void> => {
    if (!sound) return

    try {
      if (isPlaying) {
        await sound.pauseAsync()
      } else {
        await sound.playAsync()
      }
    } catch (err) {
      logger.error('[AudioPlayer] Error toggling playback:', err)
      setError('Playback error')
    }
  }

  /**
   * handleSeek
   * Seeks to a specific position in the audio
   *
   * @param newPosition - Position in milliseconds to seek to
   * @returns Promise that resolves when seek is complete
   */
  const handleSeek = async (newPosition: number): Promise<void> => {
    if (!sound) return

    try {
      await sound.setPositionAsync(newPosition)
    } catch (err) {
      logger.error('[AudioPlayer] Error seeking:', err)
    }
  }

  // Load sound on mount
  useEffect(() => {
    loadSound()

    // Cleanup on unmount
    return (): void => {
      if (sound) {
        logger.debug('[AudioPlayer] Unloading sound')
        sound.unloadAsync()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (isLoading) {
    return (
      <Row
        gap="sm"
        alignItems="center">
        <ActivityIndicator size="small" />
        <Text.Caption>Loading audio...</Text.Caption>
      </Row>
    )
  }

  if (error) {
    return (
      <Column gap="xs">
        <Text.Caption style={styles.errorText}>{error}</Text.Caption>
        <Button
          label="Retry"
          onPress={loadSound}
          size="small"
        />
      </Column>
    )
  }

  const progress = duration > 0 ? position / duration : 0

  return (
    <Column gap="sm">
      {/* Time Display */}
      <Row justifyContent="space-between">
        <Text.Caption>{formatTime(position)}</Text.Caption>
        <Text.Caption>{formatTime(duration)}</Text.Caption>
      </Row>

      {/* Progress Bar */}
      <Pressable
        onPress={e => {
          const {locationX} = e.nativeEvent
          const {width} = e.currentTarget.measure?.(rect => rect) || {
            width: 0,
          }
          if (width > 0) {
            const seekPosition = (locationX / width) * duration
            handleSeek(seekPosition)
          }
        }}
        style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {width: `${progress * 100}%`},
            ]}
          />
        </View>
      </Pressable>

      {/* Controls */}
      <Button
        label={isPlaying ? '⏸ Pause' : '▶ Play'}
        onPress={togglePlayback}
        disabled={!sound}
        size="small"
      />
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  progressBarContainer: {
    width: '100%',
    paddingVertical: theme.spacing.xs,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.surface.secondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.border.accent,
  },
  errorText: {
    color: theme.colors.text.error,
  },
}))
