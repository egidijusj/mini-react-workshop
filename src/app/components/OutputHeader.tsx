import { Badge, Box, Heading } from '@wix/design-system'

export const OutputHeader = ({
  miniReactRendersLikeReact,
}: {
  miniReactRendersLikeReact: boolean | null
}) => {
  return (
    <Box verticalAlign="middle" gap="20px">
      <Heading size="medium">Render Output</Heading>
      {miniReactRendersLikeReact !== null && (
        <Badge
          type="outlined"
          skin={miniReactRendersLikeReact ? 'success' : 'danger'}
        >
          {miniReactRendersLikeReact ? 'All good' : 'Something is wrong'}
        </Badge>
      )}
    </Box>
  )
}
