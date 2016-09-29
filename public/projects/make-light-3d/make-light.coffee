class LightBoard
    constructor: ->
        @drawBoard()
        @board = @newBoard()
        @render()

    drawBoard: ->
        stroke 0
        background 'rgb(95, 96, 96)'
        color '#9e9f9f'
        bold true
        font 20

        #GPIO
        color white
        for _x in [0 ... 13]
            for _y in [0 ... 2]
                x = _x * 23 + 20
                y = _y * 23 + 20
                moveTo x, y
                circle 4

        # Letters
        moveTo 73, 88
        for letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
            text letter
            move 49
        moveTo 35, 112
        for letter in [1 .. 14]
            if letter is 10 then move -3
            text letter
            move 0, 28.3

    led: (x, y, light)-> # TODO: support
        if light is undefined or light is true then light = 7
        if light is false then light = 0
        offLED = '#7f7c78'
        onLED = '#dedbc5'
        offSolder = '#858282'
        onSolder = '#ffffff'
        x = x * 49 + 66
        y = y * 28.25 + 99
        moveTo x, y
        color mix offLED, onLED, (light / 7) * 100 + .001
        rectangle 18, 15
        color mix offSolder, onSolder, (light / 7) * 100 + .001
        move 0, 7.5
        arc 7.5, 1.5, .5, true
        move 15
        arc 7.5, .5, 1.5, true

    newBoard: ->
        board = new Array(8)
        for _x in [0 .. 8]
            board[_x] = new Array(13)
            for _y in [0 .. 13]
                board[_x][_y] = 0
        return board

    render: ->
        clear()
        @drawBoard()
        for x in [0 .. 8]
            for y in [0 .. 13]
                @led(x, y, @board[x][y])

    on: (location, light) -> # TODO: brightness, multiple lights
        @board[location[0]][location[1]] = light
        @render()

    off: (location)->
        @board[location[0]][location[1]] = 0
        @render()

    all: ->
        for x in [0 .. 8]
            for y in [0 .. 13]
                @board[x][y] = 7
                @render()


    line: (A, B, light) -> # TODO
        [x1, y1, x2, y2] = [A[0], A[1], B[0], B[1]]
        run = x2 - x1
        rise = y2 - y1

        m = rise / run
        adjust = if (m >= 0) then 1 else -1
        offset = 0
        threshold = 0.5
        if m <= 1 and m >= -1
            delta = Math.abs(m)
            y = y1
            for x in [x1 .. x2]
                @board[x][y] = light
                offset += delta
                if offset >= threshold
                    y += adjust
                    threshold += 1
        else
            delta = Math.abs(run / rise)
            x = x1
            for y in [y1 .. y2]
                @board[x][y] = light
                offset += delta
                if offset >= threshold
                    x += adjust
                    threshold += 1
        @render()

    rectangle: (A, B, light) ->
        for x in [A[0] .. B[0]]
            for y in [A[1] .. B[1]]
                @board[x][y] = light
                console.log(x,y)
                @render()

    ellipse: (A, B, light) -> # TODO
        @shrug()
    triangle: (A, B, C, light)-> # TODO
        @shrug()
        ###
        # Check to see if every point is greater than or less than bounding lines. Only draw in bounding box
        for x in [0 .. WIDTH]
            for y in [ 0 .. HEIGHT]
        ###
    polygon: (A, B, C, light)-> # TODO
        @shrug()
    arc: (center, start_angle, end_angle) -> # TODO
        @shrug()
    text: (location, text)-> # TODO
        @shrug()
    circle: (width, center, light) -> # TODO
        r = Math.round(width / 2)
        for x in [-r .. r]
            for y in [-r .. r]
                distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                if (r >= distance)
                    @board[center[0] + x][center[1] + y] = light
        @render()
    scroll: (text, delay, top) -> # TODO
        @shrug()
    shrug: ->
        moveTo 250, 300
        color white
        bold true
        font 100, 'Arial'
        text '¯\\_(ツ)_/¯'
    random_loc: -> # doesn't support axis constraint
        return [random(0, 8), random(0, 13)]




