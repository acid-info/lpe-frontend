// TimeTracker.tsx
import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'

export interface ControlsTimeTrackProps {
  min?: number
  max?: number
  value?: number
  showThumb?: boolean
  alignTop?: boolean
  trackColor?: string
  trackHeight?: number
  progressColor?: string
  progressHeight?: number
  thumbSize?: number
  onValueChange?: (value: number) => void
  onMouseDown?: React.MouseEventHandler
  onMouseUp?: React.MouseEventHandler
}

export const TimeTrack: React.FC<ControlsTimeTrackProps> = ({
  min = 0,
  max = 1,
  value = 0,
  showThumb = true,
  trackColor = 'rgba(var(--lsd-surface-secondary), 1)',
  trackHeight = 1,
  progressColor = 'rgba(var(--lsd-surface-secondary), 1)',
  thumbSize = 10,
  onValueChange,
  progressHeight = 3,
  onMouseDown = () => {},
  onMouseUp = () => {},
  alignTop = false,
}) => {
  const [dragging, setDragging] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)
  const trackRef = useRef<HTMLDivElement>(null)

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const percent = (clientX - rect.left) / rect.width
    const newValue = min + percent * (max - min)
    setCurrentValue(Math.min(max, Math.max(min, newValue)))

    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (dragging) {
        calculateValue(e.clientX)
      }
    }

    const touchMoveHandler = (e: TouchEvent) => {
      if (dragging && e.touches.length > 0) {
        calculateValue(e.touches[0].clientX)
      }
    }

    const mouseUpHandler = (e: any) => {
      setDragging(false)
      onMouseUp(e)
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
    document.addEventListener('touchmove', touchMoveHandler)
    document.addEventListener('touchend', mouseUpHandler)

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('touchmove', touchMoveHandler)
      document.removeEventListener('touchend', mouseUpHandler)
    }
  }, [dragging])

  const progressStyle = {
    backgroundColor: progressColor,
    width: `${((currentValue - min) / (max - min)) * 100}%`,
    height: `${progressHeight}px`,
  }

  const thumbStyle = {
    left: `${((currentValue - min) / (max - min)) * 100}%`,
    width: thumbSize,
    height: thumbSize,
    marginLeft: 0,
    // marginTop: -thumbSize / 2,
    backgroundColor: progressColor,
  }

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <Container
      ref={trackRef}
      className={alignTop ? 'alignTop' : ''}
      style={{
        position: 'relative',
      }}
      onMouseDown={(e) => {
        setDragging(true)
        onMouseDown(e)
        calculateValue(e.clientX)
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 0) return
        setDragging(true)
        calculateValue(e.touches[0].clientX)
      }}
    >
      <div
        className={'track'}
        style={{
          backgroundColor: trackColor,
          height: `${trackHeight}px`,
        }}
      />
      <div style={progressStyle} className="progress"></div>
      {showThumb && <div style={thumbStyle} className="thumb"></div>}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 10px;
  cursor: pointer;
  position: relative;

  > * {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &.alignTop {
    > * {
      top: 0;
      transform: translateY(0);
    }
  }

  .align-center {
    display: flex;
    align-items: center;
  }

  .thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }

  .progress {
    height: 4px;
  }
`
