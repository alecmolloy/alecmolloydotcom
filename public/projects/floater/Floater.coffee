###
#  Anchor constructor
#  @param {Object} vector x, y, z coördinates for the anchor point
#  @param {Object} jitter x, y, z translation vector for the anchor point's jitter
#  @param {Number} index Which number vector this is
#  @param {Object} eVector The "euclidean vector" for the anchor point's movement. Essentially the direction and speed of the anchor point.
###

###jslint browser: true, devel: true, passfail: false, eqeq: false, plusplus: true, sloppy: true, vars: true###

###

Floater.js: by Alec Molloy.

Inspired by Dale Seymour's Book: "Introduction to Line Designs" Published by Dale Seymour Publications (1 Jun, 1990). ISBN: 0866515798

Floater.js is a JavaScript object that when instantiated, becomes a *Floater*. A Floater can have many *anchor points*. Anchor points can have *lines* drawn between them. A line can be *related* to other lines. These relationships mean that each line will have *connector lines* drawn between them. How many connector lines are drawn are dependent upon the *segments* property for each relationship.

For an example of a very basic floater, please see example.png.

In the example, you can see the three anchor points. From those anchor points, the two first lines are drawn. (They happen to share an anchor point, and so the lines join each other.) These two lines are defined as being related, with 10 segments. You can count the 10 evenly-spaced points on each line that then are turned into anchor points for 10 lines that are drawn to the opposite point on the related line.

Floaters are drawn with only straight lines, but the more segments drawn, the more it looks like a parabolic curve.

###

###*
#  Floater
#
#  @class Floater
#  @constructor
#  @param config {Object}
#  @param config.dimensions {Number}
#  @param config.fieldHeight {Number}
#  @param config.anchors {Number}
#  @param config.linesBetween {String[]}
#  @param config.segments {Number}
#  @param config.relationshipsBetween {String[]}
###

Floater = (config) ->
  @dimensions = config.dimensions or 3
  @dimensionNames = [
    'x'
    'y'
  ]
  if @dimensions == 3
    @dimensionNames.push 'z'
  @field =
    x: window.innerHeight
    y: window.innerHeight
    z: window.innerHeight
  @speed = config.speed or 1
  @jitter = config.jitter or 1
  @segments = config.segments
  # Generate anchor array
  @anchors = []
  anchor = 0
  while anchor < config.anchors
    @createAnchor()
    anchor++
  # Line
  @lines = []
  lineBetween = 0
  while lineBetween < config.linesBetween.length
    anchor1 = @anchors[config.linesBetween[lineBetween].slice(0, 1)]
    anchor2 = @anchors[config.linesBetween[lineBetween].slice(1, 2)]
    @createLine anchor1, anchor2
    lineBetween++
  # Create relationships
  @relationships = []
  relationshipBetween = 0
  while relationshipBetween < config.relationshipsBetween.length
    line1 = @lines[config.relationshipsBetween[relationshipBetween].slice(0, 1).charCodeAt() - 48]
    # Store first line
    line2 = @lines[config.relationshipsBetween[relationshipBetween].slice(1, 2).charCodeAt() - 48]
    # Store second line
    @createRelationship line1, line2
    relationshipBetween++
  return

Floater.Anchor = (vector, jitter, index, eVector) ->
  @vector = vector
  @jitter = jitter
  @index = index
  @eVector = eVector
  return

###
#  Animates all anchor point positions
#  @param {Object} this The parent Floater object
###

Floater::animateAnchors = ->
  anchor = 0
  while anchor < @anchors.length
    @updateAnchorPosition @anchors[anchor]
    anchor++
  @updateSegments()
  return

###
#  Updates an anchor point position on their euclidean vectors
#  @param {Object} this The parent Floater object
#  @param {Object} anchor The anchor point which will be translated in the direction and magnitude of its euclidean vector.
###

Floater::updateAnchorPosition = (anchor) ->
  iDimension = 0
  while iDimension < @dimensions
    dimension = @dimensionNames[iDimension]
    if anchor.vector[dimension] >= @field[dimension] / 2 or anchor.vector[dimension] <= 0 - (@field[dimension] / 2)
      anchor.eVector[dimension] *= -1
      # Reverse the sign so that it bounces and goes the other way
    anchor.vector[dimension] += anchor.eVector[dimension]
    iDimension++
  return

###
#  Creates an Anchor. An anchor has a vector (where it is in space), its jitter (a translation of how far it should be from its calculated position), and a eVector (euclidean vector: the direction and speed of the anchor point)
#  @param {Object} this The parent floater object
###

Floater::createAnchor = ->
  vector =
    x: null
    y: null
  jitter =
    x: null
    y: null
  eVector =
    x: null
    y: null
  if @dimensions == 3
    vector.z = null
    jitter.z = null
    eVector.z = null
  # Calculate random vectors within the given field, and euclidean vectors
  iDimension = 0
  while iDimension < @dimensions
    dimension = @dimensionNames[iDimension]
    vector[dimension] = Math.round(Math.random() * @field[dimension] - (@field[dimension] / 2))
    eVector[dimension] = Math.random() * @speed
    iDimension++
  # Create Anchor object from vector and euclidean ector
  anchor = new (Floater.Anchor)(vector, jitter, @anchors.length, eVector)
  # Push the new anchor into the anchor array
  @anchors.push anchor

###
#  Destroys Anchor
#  @param {Object} this The parent floater object
#  @param {Number} [index=this.anchors.length] The index of the anchor to be destroyed. Defaults to last anchor point in anchor array.
###

Floater::destroyAnchor = (index) ->
  index = index or @anchors.length - 1
  # Defaults to last anchor in array
  destroyedAnchor = @anchors.splice(index, 1)[0]
  # Remove the anchor from the array
  console.log 'destroyed anchor: ' + destroyedAnchor.index
  @checkLines destroyedAnchor
  # Check to see if there are lines affected by this removal
  destroyedAnchor

###
#  Check to see if there are lines affected by the removal of anchor points
#  @param {Object} this The parent floater object
#  @param {Object} destroyedAnchor A copy of an anchor point that has just been destroyed
###

Floater::checkAnchors = (newAnchors) ->
  while newAnchors != @anchors.length
    console.log 'checking anchors'
    if newAnchors < @anchors.length
      console.log 'there are too many anchors'
      @destroyAnchor()
    else if newAnchors > @anchors.length
      console.log 'there are too few anchors'
      @createAnchor()
  return

###
#  Line constructor
#  @param {Object} anchor1 first anchor point for line
#  @param {Object} anchor2 second anchor point for line
#  @param {Number} index
###

Floater.Line = (anchor1, anchor2, index) ->
  @index = index
  @anchor1 = anchor1
  # Anchor
  @anchor2 = anchor2
  # Anchor
  @connectorPoints = []
  return

###
#  Creates Line
#  @param {Object} this The parent floater object
#  @param {Object} anchor1 The first anchor point with which to create a line
#  @param {Object} anchor2 The second anchor point with which to create a line
###

Floater::createLine = (anchor1, anchor2) ->
  line = new (Floater.Line)(anchor1, anchor2, @lines.length)
  @lines.push line

###
#  Destroys Line
#  @param {Object} this The parent floater object
#  @param {Number} [index=this.lines.length] The index of the line to be destroyed. Defaults to last line in line array.
###

Floater::destroyLine = (index) ->
  index = index or @lines.length - 1
  # Defaults to last anchor in array
  destroyedLine = @lines.splice(index, 1)[0]
  # Remove the anchor from the array
  console.log 'destroyed line ' + index
  @checkRelationships destroyedLine
  # Check to see if there are lines affected by this removal
  destroyedLine

###
#  Check to see if there are lines affected by the removal of anchor points
#  @param {Object} this The parent floater object
#  @param {Object} destroyedAnchor A copy of an anchor point that has just been destroyed
###

Floater::checkLines = (destroyedAnchor) ->
  console.log 'checking lines for anchor ' + destroyedAnchor.index
  i = 0
  while i < @lines.length
    if @lines[i].anchor1.index == destroyedAnchor.index or @lines[i].anchor2.index == destroyedAnchor.index
      # Looks to see if the current line has an anchor point that no longer exists
      console.log 'found anchor ' + destroyedAnchor.index + ' in line ' + i
      @destroyLine i
      # Removes the line and stores it in a variable
    i++
  return

###
#  Creates a relationship
#  @param {Object} this The parent floater object
#  @param {Object} line1 The first line with which to create a relationship
#  @param {Object} line2 The second line with which to create a relationship
###

###
#  Connector Point constructor
#  @param {Object} vector coordinates for connector point
###

Floater.ConnectorPoint = (vector) ->
  @x = vector.x or 0
  # Point
  @y = vector.y or 0
  # Point
  @z = vector.z or 0
  # Point
  return

Floater::createRelationship = (line1, line2) ->
  i = @relationships.length
  @relationships.push
    line1: line1
    line2: line2
  # Create Segments
  @createSegments i
  @relationships[i]

###
#  Destroys Line
#  @param {Object} this The parent floater object
#  @param {Number} [index=this.lines.length] The index of the line to be destroyed. Defaults to last line in line array.
###

Floater::destroyRelationship = (index) ->
  index = index or @relationships.length - 1
  # Defaults to last anchor in array
  @relationships.splice index, 1
  # Remove the anchor from the array
  return

###
#  Check to see if there are relationships affected by the removal of lines
#  @param {Object} this The parent floater object
#  @param {Object} destroyedLine A copy of a line that has just been destroyed
###

Floater::checkRelationships = (destroyedLine) ->
  console.log 'checking relationships for line ' + destroyedLine.index
  relationship = 0
  while relationship < @relationships.length
    if @relationships[relationship].line1.index == destroyedLine.index or @relationships[relationship].line2.index == destroyedLine.index
      # Looks to see if the current relationship has a line that no longer exists
      console.log 'found line ' + destroyedLine.index + ' in relationship ' + relationship
      @relationships.splice relationship, 1
      # Removes the line
      console.log 'destroyed relationship ' + relationship
    relationship++
  return

###
#
#  Creates segment endpoint positions, and also how many segments there are for a given relationship
#  @param {Object} this The parent floater object
#  @param {Number} relationship Which relationship whose segments you want to update
#  @param {Number} [segments=this.relationships[index].segments] The number of segments you want to update the relationship to have
###

Floater::createSegments = (relationship, segments) ->
  newSegments = segments or @segments
  for line of @relationships[relationship]
    # allows us to access each line's key using bracket notation
    if @relationships[relationship][line].connectorPoints.length == 0
      segment = 0
      while segment <= @segments
        connector = new (Floater.ConnectorPoint)(
          x: null
          y: null
          z: null)
        @relationships[relationship][line].connectorPoints.push connector
        segment++
  @updateSegments()
  @segments

###
#  Updates the positions of segments
#  @param {Object} this The parent floater object
###

Floater::updateSegments = ->
  relationship = 0
  while relationship < @relationships.length
    for iLine of @relationships[relationship]
      line = @relationships[relationship][iLine]
      anchor1 = line.anchor1
      anchor2 = line.anchor2
            segment = 0
      while segment < @segments
                iDimension = 0
        while iDimension < @dimensions
          dimension = @dimensionNames[iDimension]
          anchor1D = anchor1.vector[dimension] + anchor1.jitter[dimension]
          anchor2D = anchor2.vector[dimension] + anchor2.jitter[dimension]
          dimensionValue = (anchor2D - anchor1D) / @segments * segment + anchor1D
          line.connectorPoints[segment][dimension] = dimensionValue
          iDimension++
        segment++
    relationship++
  @segments

###
#  Updates the jitter property of each anchor with sound data.
#  @param {Object} this The parent floater object
###

Floater::microphoneJitter = ->
  anchor = 0
  while anchor < @anchors.length
    @anchors[anchor].jitter.x = sound.dataArray[anchor * sound.dataArray.length / @anchors.length] * @jitter
    @anchors[anchor].jitter.y = 0
    @anchors[anchor].jitter.z = 0
    anchor++
  return

###
#  Reports on the current status of the floater
###

Floater::report = ->
  console.log 'Anchors: '
  console.log @anchors
  console.log 'Lines: '
  console.log @lines
  console.log 'Relationships: '
  console.log @relationships
  return

# ---
# generated by js2coffee 2.1.0
