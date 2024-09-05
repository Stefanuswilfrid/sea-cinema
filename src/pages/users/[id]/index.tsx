import AddPhoto from "@/components/AccountSettings/AddPhoto";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CurrentUser } from "@/types";
import SEO from "@/components/SEO";

export default function EditProfile() {
  const { data } = useSession();
  const currentUser = data?.user as CurrentUser;
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const lastH1 = document.querySelector(".last-h1") as HTMLElement;
      const bottomOfLastH1 = lastH1?.getBoundingClientRect().bottom;

      if (bottomOfLastH1 && bottomOfLastH1 < window.innerHeight + -80) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SEO
        title="Edit Profile - SEA Cinema"
        desc="SEA Cinema is a rising star in the movie theater industry known for
        its affordable ticket prices and wide range of movie genres."
      />
      <div className="w-full xl:px-20 md:px-10 sm:px-6 px-4 mt-8 mx-6 sm:max-w-5xl sm:mx-auto flex gap-20">
        <div className="relative">
          <AddPhoto id={currentUser?.id} />
        </div>
        <div className="md:ml-12 w-full">
          <div>
            <h1 className="text-[32px] font-black tracking-tight leading-9">
              Your Profile
            </h1>
          </div>
          <section>
            <h1
              className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr"
            >
              <span className="h1f0bcpo atm_c8_11rlvjh atm_g3_1xap3gc atm_fr_1xai86l atm_7l_dezgoh atm_cs_19iasv6 dir dir-ltr">
                About you
              </span>
            </h1>
            <div className="c1ppnxkx atm_h3_1ph3nq8 atm_c8_16fp2vl atm_g3_x9fz81 atm_fr_12ckmjc atm_9s_1txwivl atm_ar_1bp4okc atm_cx_8tjzot atm_j3_13slfx3__1v156lz dir dir-ltr">
              <div className="_11oyobo">
                <span className="_1e2prbn">test</span>
              </div>
              <button
                type="button"
                className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 b1uxatsa atm_c8_1kw7nm4 atm_bx_1kw7nm4 atm_cd_1kw7nm4 atm_ci_1kw7nm4 atm_g3_1kw7nm4 atm_9j_tlke0l_1nos8r_uv4tnr atm_7l_1kw7nm4_pfnrn2 atm_rd_8stvzk_pfnrn2 c1qih7tm atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_7l_jt7fhx atm_rd_8stvzk atm_5j_1896hn4 atm_cs_10d11i2 atm_r3_1kw7nm4 atm_mk_h2mmj6 atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_v5whe7 atm_rd_8stvzk_v5whe7 atm_7l_177r58q_1nos8r_uv4tnr atm_rd_8stvzk_1nos8r_uv4tnr atm_7l_9vytuy_4fughm_uv4tnr atm_rd_8stvzk_4fughm_uv4tnr atm_rd_8stvzk_xggcrc_uv4tnr atm_7l_1he744i_csw3t1 atm_rd_8stvzk_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_jt7fhx_1w3cfyq atm_rd_8stvzk_1w3cfyq atm_uc_aaiy6o_1w3cfyq atm_70_1p56tq7_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_7l_jt7fhx_pfnrn2_1oszvuo atm_rd_8stvzk_pfnrn2_1oszvuo atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1p56tq7_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_9vytuy_1o5j5ji atm_rd_8stvzk_1o5j5ji atm_rd_8stvzk_1mj13j2 dir dir-ltr"
              >
                Edit Intro
              </button>
            </div>
          </section>
          {/* <h1 className="h-96">Hello</h1> */}
          <h1 className="h-96">Hello</h1>
          <h1 className="h-96">Hello</h1>
          <h1 className="h-96">Hello</h1>
          <h1 className="h-96 last-h1">Hello</h1>
          <div
            className={`bg-white border-t-2 w-full px-10 py-4 ${
              isFixed ? "" : "relative"
            }`}
          >
            <div className="max-w-6xl text-right m-auto">
              <button className="px-6 py-3 bg-black text-white rounded-lg ml-auto">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 transform bg-white border-t-2 w-full px-10 py-4 ${
          isFixed ? "opacity-100 fixed bottom-0" : " opacity-0 "
        }`}
      >
        <div className="max-w-6xl text-right m-auto">
          <button className="px-6 py-3 bg-black text-white rounded-lg">
            Done
          </button>
        </div>
      </div>
    </>
  );
}
