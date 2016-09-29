#  F-F-F-F          F -> F-F+F+FF-F-F+F                         0       Quadratic Koch island
#  F-F-F-F     3    F -> FF-F-F-F-F-F+F                         100     Koch Curve a
#  -F          3    F -> F+F-F-F+F                              0       Koch Curve b
#  F-F-F-F     6    F -> F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF     0       Koch Islands + Lakes


production = (axiom, generations) ->
    if generations > 0
        successor = ''
        for token in axiom
            switch token
                when 'F' then successor += 'FF-F-F-F-F-F+F'
                else successor += token
        return production(successor, --generations)
    return axiom



scaling = 3
generations = 5
instruction = production('F-F-F-F', generations)
#instruction = production('-F', generations)
δ = 90
stroke 1
xOffset = 300





translator = (axiom, turtle) ->
    for token in axiom
        switch token
            when 'F'
                turtle.F()
            when 'f'
                turtle.f()
            when '+'
                turtle.right()
            when '-'
                turtle.left()

Turtle = (@x, @y, @α, @d, @δ) ->

Turtle::F = ->
    moveTo @x, @y
    xprime = @x + @d * Math.cos(@α / 180 * Math.PI)
    yprime = @y + @d * Math.sin(@α / 180 * Math.PI)
    stroke rotate red, @x
    lineTo xprime, yprime
    moveTo xprime, yprime
    @x = xprime
    @y = yprime

Turtle::f = ->
    xprime = @x + Math.cos(@α / 180 * Math.PI)
    yprime = @y + Math.sin(@α / 180 * Math.PI)
    @x = xprime
    @y = yprime
    moveTo @x, @y

Turtle::right = ->
    @α += @δ

Turtle::left = ->
    @α -= @δ

turtle = new Turtle(150 + xOffset, 350, 0, 200 / Math.pow(scaling, generations), δ)
translator(instruction, turtle)
