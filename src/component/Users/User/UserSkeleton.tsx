import React, { VFC } from "react"
import ContentLoader from "react-content-loader"

type UserSkeletonProps = {}

const UserSkeleton: VFC<UserSkeletonProps> = (props) => (
    <ContentLoader
        className='user__skeleton'
        speed={2}
        width={200}
        height={119}
        viewBox="0 0 200 119"
        backgroundColor="#dbdbdb"
        foregroundColor="#998f8f"
        {...props}
    >
        <rect x="568" y="217" rx="5" ry="5" width="220" height="10" />
        <rect x="112" y="81" rx="0" ry="0" width="0" height="4" />
        <circle cx="41" cy="41" r="40" />
        <rect x="2" y="86" rx="2" ry="2" width="80" height="24" />
        <rect x="91" y="6" rx="2" ry="2" width="87" height="22" />
    </ContentLoader>
)

export default UserSkeleton
