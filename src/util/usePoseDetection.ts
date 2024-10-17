import { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/pose';

// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepose_mediapipe
const createPoseDetector = async () => {
    const model = poseDetection.SupportedModels.BlazePose;
    // const detectorConfig = {
    //   architecture: 'MobileNetV1',
    //   outputStride: 16,
    //   inputResolution: { width: 640, height: 480 },
    //   multiplier: 0.75,
    // };
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
                      // or 'base/node_modules/@mediapipe/pose' in npm.
      };
    const poseDetector = await poseDetection.createDetector(model, detectorConfig);
    return poseDetector
}

const usePoseDetection = (videoRef) => {
  const [detector, setDetector] = useState(null);
  const [poses, setPoses] = useState([]);
  const [posesLost, setPosesLost] = useState(false);
  const [posesFound, setPosesFound] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initBodyDetection = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        const poseDetector = await createPoseDetector()
        setDetector(poseDetector);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initBodyDetection();
    
    // return () => {
    //   if (videoRef.current && videoRef.current.srcObject) {
    //     const tracks = videoRef.current.srcObject.getTracks();
    //     tracks.forEach(track => track.stop());
    //   }
    // };
  }, []);

  useEffect(() => {
    const estimatePoses = async () => {
      if (!detector || !videoRef.current) return;

      const estimationConfig = {
        maxPoses: 1,
        flipHorizontal: true,
        scoreThreshold: 0.5,
        nmsRadius: 20,
      };
      const estimatedPoses = await detector.estimatePoses(videoRef.current, { estimationConfig });
      const posesExist = estimatedPoses.length > 0;
      setPoses(estimatedPoses);

      setPosesLost(!posesExist && poses.length > 0);
      setPosesFound(posesExist && poses.length === 0);
    };

    if (!loading) {
      const intervalId = setInterval(estimatePoses, 100); // Adjust interval as needed
      return () => clearInterval(intervalId);
    }
  }, [detector, loading, poses.length]);

  return { poses, posesLost, posesFound, loading };
};

export default usePoseDetection;
