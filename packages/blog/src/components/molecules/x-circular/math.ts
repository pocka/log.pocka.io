export const getPosition = (radius: number = 0, radian: number = 0) => [
  radius * Math.cos(radian),
  radius * Math.sin(radian)
]

export const degreeToRadian = (degree: number) => degree * (Math.PI / 180)
