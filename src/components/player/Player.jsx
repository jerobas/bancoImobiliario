import React, { useState } from 'react'
import { Square } from '../../pages/Border/Border.styles'

export default class Player {
    money = 0;
    position = 0;
    render = () => <Square/>;
}