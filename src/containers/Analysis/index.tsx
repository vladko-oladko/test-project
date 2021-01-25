import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { fetchPageForAnalysisAction } from '../../store/analysis/sagas';
import {
  selectAnalysisData,
  selectAnalysisLoading,
  selectError,
} from '../../store/analysis/selectors';
import styles from './index.module.css';

const Analysis: React.FC = () => {
  const dispatch = useDispatch();

  const analysisData = useSelector(selectAnalysisData);
  const error = useSelector(selectError);
  const loading = useSelector(selectAnalysisLoading);

  const [analysisPage, setAnalysisPage] = useState('');
  const [commonlyTag, setCommonlyTag] = useState('');
  const [uniqueTags, setUniqueTags] = useState([]);
  const [longestPath, setLongestPath] = useState([]);

  const getLongestPath = (
    commonlyUsedTag: { tagName: string, count: number },
    parsedHtml: Document,
  ) => {
    let longestNode: Array<string> = [];
    let longestNodeCount = 0;

    const getNodeTree = (node: ChildNode): { tree: Array<string>, tagCount: number } => {
      let currentTagCount = 0;

      if (node.nodeName === commonlyUsedTag.tagName) {
        currentTagCount += 1;
      }

      if (node.hasChildNodes()) {
        let childrenTree: Array<string> = [];
        let childrenTagCount = 0;

        for (let i = 0; i < node.childNodes.length; i += 1) {
          const { tree, tagCount } = getNodeTree(node.childNodes[i]);

          if (childrenTagCount <= tagCount) {
            childrenTagCount = currentTagCount + tagCount;
            childrenTree = [node.nodeName, ...tree];
          }

          if (longestNodeCount <= childrenTagCount) {
            longestNodeCount = childrenTagCount;
            longestNode = childrenTree;
          }
        }

        return {
          tree: childrenTree,
          tagCount: childrenTagCount,
        };
      }

      return {
        tree: [node.nodeName],
        tagCount: currentTagCount,
      };
    };

    getNodeTree(parsedHtml.documentElement);

    return { longestNode, longestNodeCount };
  };

  useEffect(() => {
    const parsedHtml = new DOMParser().parseFromString(analysisData, 'text/html');
    const allTags = Array.from(parsedHtml.getElementsByTagName('*'));

    const uniqueTagsObject: { [key: string]: number } = {};
    allTags.forEach((item) => {
      if (uniqueTagsObject[item.tagName] === undefined) {
        uniqueTagsObject[item.tagName] = 1;
      } else {
        uniqueTagsObject[item.tagName] += 1;
      }
    });

    let commonlyUsedTag: { tagName: string, count: number } = {
      tagName: '',
      count: 0,
    };

    const uniqueTagsArray = Object.keys(uniqueTagsObject).map((item) => {
      if (commonlyUsedTag.count < uniqueTagsObject[item]) {
        commonlyUsedTag = {
          tagName: item,
          count: uniqueTagsObject[item],
        };
      }

      return item;
    });

    const { longestNode } = getLongestPath(commonlyUsedTag, parsedHtml);

    setCommonlyTag(commonlyUsedTag.tagName);
    setUniqueTags(uniqueTagsArray);
    setLongestPath(longestNode);
  }, [analysisData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnalysisPage(event.target.value);
  };

  const handleClick = () => {
    dispatch(fetchPageForAnalysisAction(analysisPage));
  };

  if (error) {
    return (
      <div>{error}</div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <input title="Page for analysis" onChange={handleChange} />
        <button type="button" onClick={handleClick}>Analyse</button>
      </div>
      {!!analysisData && (
      <div>
        <p>
          1. Unique tags:
          {' '}
          {uniqueTags.join(', ').toLocaleLowerCase()}
        </p>
        <p>
          2. Most commonly used tag:
          {' '}
          {commonlyTag}
        </p>
        <p>
          3. Longest path:
          {' '}
          {longestPath.join(' => ').toLocaleLowerCase()}
        </p>
      </div>
      )}
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={60}
        width={60}
        className={styles.loading}
        visible={loading}
      />
    </div>
  );
};

export default Analysis;
