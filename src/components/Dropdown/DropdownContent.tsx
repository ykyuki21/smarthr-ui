import * as React from 'react'
import styled from 'styled-components'

import { LightBalloon } from '../Balloon'
import { DropdownConsumer } from './Dropdown'

export interface Rect {
  right: number
  left: number
}

const getPositionClassName = (clientRect?: Rect): 'center' | 'left' | 'right' => {
  if (!clientRect) return 'center'
  if (clientRect.right < window.innerWidth / 2) return 'left'
  if (clientRect.left > window.innerWidth / 2) return 'right'
  return 'center'
}

export const DropdownContent: React.FC<{}> = ({ children }) => (
  <DropdownConsumer>
    {({ active, clientRect }) => (
      <Wrapper
        className={`DropdownContent ${active ? 'active' : ''} ${getPositionClassName(clientRect)}`}
      >
        <LightBalloon vertical="top" horizontal={getPositionClassName(clientRect)}>
          {children}
        </LightBalloon>
      </Wrapper>
    )}
  </DropdownConsumer>
)

const Wrapper = styled.div`
  visibility: hidden;
  opacity: 0;
  transform: scale(0);
  z-index: 1000;
  position: absolute;
  top: calc(100% + 10px);
  width: auto;
  height: auto;
  transition: visibility 0.1s cubic-bezier(0.215, 0.61, 0.355, 1),
    opacity 0.1s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }

  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
`