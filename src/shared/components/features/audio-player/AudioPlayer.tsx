import React, {useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useAudioPlayer, useAudioPlayerStatus} from 'expo-audio'

import {logger} from '@/core/lib/logger/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable/Button'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
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
  const player = useAudioPlayer(src)
  const status = useAudioPlayerStatus(player)
  const [error, setError] = useState<string | undefined>(undefined)

  /**
   * togglePlayback
   * Toggles between play and pause
   *
   * @returns void
   */
  const togglePlayback = (): void => {
    try {
      if (status.playing) {
        player.pause()
      } else {
        player.play()
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
   * @param newPosition - Position in seconds to seek to
   * @returns void
   */
  const handleSeek = (newPosition: number): void => {
    try {
      player.seekTo(newPosition)
    } catch (err) {
      logger.error('[AudioPlayer] Error seeking:', err)
    }
  }

  useEffect(() => {
    logger.debug('[AudioPlayer] Status:', {
      playing: status.playing,
      currentTime: status.currentTime,
      duration: status.duration,
    })
  }, [status.playing, status.currentTime, status.duration])

  if (!status.duration && !error) {
    return (
      <Row
        gap="sm"
        center>
        <ActivityIndicator size="small" />
        <Text.Label>Loading audio...</Text.Label>
      </Row>
    )
  }

  if (error) {
    return (
      <Column gap="xs">
        <Text.Label color="warning">{error}</Text.Label>
        <Button
          label="Retry"
          onPress={(): void => {
            setError(undefined)
            player.replace(src)
          }}
        />
      </Column>
    )
  }

  const position = status.currentTime * 1000 // Convert to milliseconds for formatTime
  const duration = status.duration * 1000 // Convert to milliseconds for formatTime
  const progress = duration > 0 ? position / duration : 0

  return (
    <Column gap="sm">
      <Row justifyContent="space-between">
        <Text.Label>{formatTime(position)}</Text.Label>
        <Text.Label>{formatTime(duration)}</Text.Label>
      </Row>

      <PressableBase
        onPress={e => {
          const {locationX} = e.nativeEvent

          e.currentTarget.measure((_x, _y, width) => {
            if (width > 0) {
              const seekPositionSeconds =
                (locationX / width) * (duration / 1000)

              handleSeek(seekPositionSeconds)
            }
          })
        }}>
        <Row
          style={styles.progressBarBackground}
          padding="no">
          <Row
            padding="sm"
            flex={1}
            stretch
            style={[styles.progressBarFill, {width: `${progress * 100}%`}]}
          />
        </Row>
      </PressableBase>

      <Button
        label={status.playing ? '⏸ Pause' : '▶ Play'}
        onPress={togglePlayback}
      />
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  progressBarBackground: {
    backgroundColor: theme.color.pressable.secondary.default.background,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: theme.color.border.default,
  },
}))
