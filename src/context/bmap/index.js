import React, { useContext, useMemo } from "react";
import env from "../../utils/env";

const BmapContext = React.createContext(undefined);

const BmapProvider = (props) => {
  const notifyIndexer = (rawTx) => {
    return new Promise((resolve, reject) => {
      fetch(`${env.BMAP_API_URL}/ingest`, {
        // `https://b.map.sv/ingest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawTx }),
      })
        .then((resp) => {
          console.log({ resp });
          const json = resp.json();
          resolve(json);
        })
        .catch((e) => {
          reject(e);
        });
      //     console.log({ resp });
      //     const json = await resp.json();
      //     resolve(json);
      //   } catch (e) {
      //     reject(e);
      //   }
    });
  };

  const value = useMemo(
    () => ({
      notifyIndexer,
    }),
    [notifyIndexer]
  );

  return (
    <>
      <BmapContext.Provider value={value} {...props} />
    </>
  );
};

const useBmap = () => {
  const context = useContext(BmapContext);
  if (context === undefined) {
    throw new Error("useBmap must be used within an BmapProvider");
  }
  return context;
};

export { BmapProvider, useBmap };

//
// Utils
//
