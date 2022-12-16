
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = () => {
    return (
        <section>
            <div className="row">
                {Array(3)
                    .fill()
                    .map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#a19d9d">
                                <p>
                                    <Skeleton height={200} />
                                </p>
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#a19d9d">
                                <p className="card-channel">
                                    <Skeleton width={`60%`} />
                                </p>
                            </SkeletonTheme>
                            {/* <h6>
                        <Skeleton circle={true} height={70} width={70} /> &nbsp;
                        </h6> */}
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#a19d9d">
                                <h4 className="card-title">
                                    <Skeleton height={36} width={`80%`} />
                                </h4>
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#a19d9d">
                                <p className="card-channel">
                                    <Skeleton width={`60%`} />
                                </p>
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#d4d4d4" highlightColor="#a19d9d">
                                <div className="card-metrics">
                                    <Skeleton width={`90%`} />
                                </div>
                            </SkeletonTheme>

                        </div>
                    ))}
            </div>



        </section>
    );
};

export default SkeletonCard;